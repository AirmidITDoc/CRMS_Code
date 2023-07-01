import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { AdministrationService } from '../administration.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';
export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}

/**
 * The Json object for to-do list data.
 */
var TREE_DATA = {
};

@Component({
  selector: 'app-role-template',
  templateUrl: './role-template.component.html',
  styleUrls: ['./role-template.component.scss']
})
export class RoleTemplateComponent implements OnInit {

  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: TodoItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  treeDataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';
  tableDataSource = new MatTableDataSource<any>();

  displayedColumns = [
    'RoleId',
    'RoleName',
    'action'
  ];
  dataSource1 = new MatTableDataSource<SSRoleTemplate>();
  menuActions: Array<string> = [];

  isChecked: boolean = false;
  TemplateForm: FormGroup;
  sIsLoading: string = '';

  constructor(public _registerService: AdministrationService,
    private accountService: AuthenticationService,
    private _fuseNavigationService: FuseNavigationService,
    public dialogRef: MatDialogRef<RoleTemplateComponent>,
    private formBuilder: FormBuilder
  ) {
    this.resetTree();
  }

  ngOnInit(): void {
    this.createForm();
    this.getSstempletemasterList();
    //  this.tableDataSource.data = [
    //    {RegId: 41369, RegDate: "2021-07-07T00:00:00", RegTime: "2021-07-07T12:24:38", PrefixID: 11}
    //   ];
    //   var D_data = {
    //     "Reg_No": '0',
    //     "F_Name": '%',
    //     "L_Name": '%',
    //     "From_Dt": '01/01/1900',
    //     "To_Dt": '01/01/1900',
    //   }
    //   this.tableDataSource.data = [{ RegNo: 41369, FirstName: "2021-07-07T00:00:00", RegTime: "2021-07-07T12:24:38", PrefixID: 11 }];
  }

  buildFileTree(obj: { [key: string]: any }, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new TodoItemNode();
      node.item = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node.item
      ? existingNode
      : new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    // console.log('this.checklistSelection.isSelected(node)======', this.checklistSelection.isSelected(node));
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    const currentLevel = this.getLevel(node);
    if (currentLevel < 1) {
      return null;
    }
    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];
      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }
  createForm() {
    this.TemplateForm = this.formBuilder.group({
      FirstName: [''],
      IsDeleted: [''],

    });
  }

  getSstempletemasterList() {
    this.sIsLoading = 'loading-data';
    this._registerService.getssroletemplatemasterList().subscribe(data => {
      this.dataSource1.data = [];
      this.sIsLoading = '';
      this.dataSource1.data = data as SSRoleTemplate[];
      // this.treeDataSource.sort =this.sort;
      // this.treeDataSource.paginator=this.paginator;
      // console.log(this.dataSource1.data);
    });
  }

  onSave() {
    // debugger;
    //master
    if (this.checklistSelection.selected.length == 0) {
      Swal.fire('Error !', 'Please at least one Role!', 'error');
      return;
    }
    let RoleTemplateMasterSaveObj = {};
    RoleTemplateMasterSaveObj['RoleId'] = 0;
    RoleTemplateMasterSaveObj['RoleName'] = this.TemplateForm.get('FirstName').value;
    RoleTemplateMasterSaveObj['IsDeleted'] = 0;//this.TemplateForm.get('IsDeleted').value;
    RoleTemplateMasterSaveObj['AddedBy'] = this.accountService.currentUserValue.user.id,
      RoleTemplateMasterSaveObj['AddedByDate'] = "2021-07-12T10:02:32.429Z";

    let roleDetailSaveArr = [];
    const partial = this.treeControl.dataNodes
      .filter(x => this.descendantsPartiallySelected(x))
    // console.log('====', this._fuseNavigationService.getCurrentNavigation()[0].children);
    // console.log(this.checklistSelection.selected);
    // this.checklistSelection.selected.forEach(element1 => {
    //   if((element1.level == 0 || element1.level == 1) && element1.expandable == true) {
    //     let index = this.checklistSelection.selected.indexOf(element1);
    //     if(index > -1) {
    //       this.checklistSelection.selected.splice(index, 1);
    //     }
    //   }
    // });
    let allTreeData = this._fuseNavigationService.getCurrentNavigation()[0].children;
    this.checklistSelection.selected.forEach(checkedElement => {
      if (checkedElement.level == 0) {
        allTreeData.forEach(allTreeDataElement => {
          if (allTreeDataElement.title == checkedElement.item) {
            let roleDetailObj = new RoleDetailSaveObj();
            // roleDetailObj. menu_master_id = checkedElement.item.toString();
            roleDetailObj.menu_master_link_name = checkedElement.item.toString();
            roleDetailObj.menu_master_icon = "apps";
            roleDetailObj.menu_master_action = "#";
            roleDetailObj.roleId = 0;
            roleDetailObj.addedBy = this.accountService.currentUserValue.user.id,
              roleDetailObj.addedByDate = '2021-07-12T10:02:32.429Z';
            roleDetailSaveArr.push(roleDetailObj);
          }
        });
      }
      if (checkedElement.level == 1) {
        allTreeData.forEach(allTreeDataElement1 => {
          allTreeDataElement1.children.forEach(detailElement => {
            if (detailElement.title == checkedElement.item) {
              let roleDetailObj1 = new RoleDetailSaveObj();
              roleDetailObj1.menu_master_link_name = allTreeDataElement1.title.toString();
              roleDetailObj1.menu_master_detail_link_name = checkedElement.item.toString();
              roleDetailObj1.roleId = 0;
              roleDetailObj1.addedBy = this.accountService.currentUserValue.user.id,
                roleDetailObj1.addedByDate = '2021-07-12T10:02:32.429Z';
              roleDetailSaveArr.push(roleDetailObj1);
            }
          });
        });
      }
      if (checkedElement.level == 2) {
        allTreeData.forEach(allTreeDataElement2 => {
          if (allTreeDataElement2.children) {
            allTreeDataElement2.children.forEach(detailElement1 => {
              if (detailElement1.children) {
                detailElement1.children.forEach(element => {
                  if (element.title == checkedElement.item) {
                    let roleDetailObj1 = new RoleDetailSaveObj();
                    roleDetailObj1.menu_master_link_name = allTreeDataElement2.title.toString();
                    roleDetailObj1.menu_master_detail_detail_link_name = checkedElement.item.toString();
                    roleDetailObj1.menu_master_detail_link_name = detailElement1.title.toString();
                    roleDetailObj1.roleId = 0;
                    roleDetailObj1.addedBy = this.accountService.currentUserValue.user.id,
                      roleDetailObj1.addedByDate = '2021-07-12T10:02:32.429Z';
                    roleDetailSaveArr.push(roleDetailObj1);
                  }
                });
              }
            });
          }
        });
      }

    });

    // console.log('roleDetailSaveArr==', roleDetailSaveArr);

    const sS_RoleTemplateMasterSave = new RoleTemplateMasterSave(RoleTemplateMasterSaveObj);


    console.log('============================== Save OP Billing ===========');
    let submitData = {
      "sS_RoleTemplateMasterSave": sS_RoleTemplateMasterSave,
      "sS_RoleTemplateDetailSave": roleDetailSaveArr,

    };

    console.log(submitData);
    this._registerService.RoleTemplateMasterSave(submitData).subscribe(response => {
      if (response) {
        Swal.fire('Congratulations !', 'Role Template Master data saved Successfully !', 'success').then((result) => {
          if (result.isConfirmed) {
            this.resetTree();
            this.getSstempletemasterList();
          }
        });
      } else {
        Swal.fire('Error !', 'Role Template Master data not saved', 'error');
      }
      //  this.isLoading = '';
    });


  }


  onEdit() {
    let roleMasterUpdateArr = [];
    let RoleTemplateMasterUpdateObj = {};
    RoleTemplateMasterUpdateObj['RoleId'] = 0;
    RoleTemplateMasterUpdateObj['RoleName'] = "AD";
    RoleTemplateMasterUpdateObj['IsDeleted'] = false;
    RoleTemplateMasterUpdateObj['UpdatedBy'] = this.accountService.currentUserValue.user.id,
      RoleTemplateMasterUpdateObj['UpdatedByDate'] = "2021-07-12T10:02:32.429Z";

    roleMasterUpdateArr.push(RoleTemplateMasterUpdateObj);

    let RoleTemplateDetailDeleteObj = {};
    RoleTemplateDetailDeleteObj['RoleId'] = 0;

    let roleDetailSaveArr = [];
    const partial = this.treeControl.dataNodes
      .filter(x => this.descendantsPartiallySelected(x))
    // console.log('====', this._fuseNavigationService.getCurrentNavigation()[0].children);
    // console.log(this.checklistSelection.selected);
    let allTreeData = this._fuseNavigationService.getCurrentNavigation()[0].children;
    this.checklistSelection.selected.forEach(checkedElement => {
      if (checkedElement.level == 0) {
        allTreeData.forEach(allTreeDataElement => {
          if (allTreeDataElement.title == checkedElement.item) {
            let roleDetailObj = new RoleDetailSaveObj();
            roleDetailObj.menu_master_link_name = checkedElement.item.toString();

            roleDetailObj.menu_master_icon = "apps";
            roleDetailObj.menu_master_link_name = "Setup";
            roleDetailObj.menu_master_action = "#";

            roleDetailObj.roleId = 0;
            roleDetailObj.addedBy = this.accountService.currentUserValue.user.id,
              roleDetailObj.addedByDate = '2021-07-12T10:02:32.429Z';
            roleDetailSaveArr.push(roleDetailObj);
          }
        });
      }
      if (checkedElement.level == 1) {
        allTreeData.forEach(allTreeDataElement1 => {
          allTreeDataElement1.children.forEach(detailElement => {
            if (detailElement.title == checkedElement.item) {
              let roleDetailObj1 = new RoleDetailSaveObj();
              roleDetailObj1.menu_master_link_name = allTreeDataElement1.title.toString();
              roleDetailObj1.menu_master_detail_link_name = checkedElement.item.toString();

              roleDetailObj1.menu_master_detail_action = "#";
              roleDetailObj1.menu_master_detail_icon = "apps";

              roleDetailObj1.roleId = 0;
              roleDetailObj1.addedBy = this.accountService.currentUserValue.user.id,
                roleDetailObj1.addedByDate = '2021-07-12T10:02:32.429Z';
              roleDetailSaveArr.push(roleDetailObj1);
            }
          });
        });
      }
      if (checkedElement.level == 2) {
        allTreeData.forEach(allTreeDataElement2 => {
          if (allTreeDataElement2.children) {
            allTreeDataElement2.children.forEach(detailElement1 => {
              if (detailElement1.children) {
                detailElement1.children.forEach(element => {
                  if (element.title == checkedElement.item) {
                    let roleDetailObj1 = new RoleDetailSaveObj();
                    roleDetailObj1.menu_master_link_name = allTreeDataElement2.title.toString();
                    roleDetailObj1.menu_master_detail_detail_link_name = checkedElement.item.toString();
                    roleDetailObj1.menu_master_detail_link_name = detailElement1.title.toString();



                    roleDetailSaveArr.push(roleDetailObj1);
                  }
                });
              }
            });
          }
        });
      }
    });
    // console.log('roleDetailSaveArr==', roleDetailSaveArr);

    const sS_RoleTemplateMasterUpdate = new RoleTemplateMasterUpdate(RoleTemplateMasterUpdateObj);
    const sS_RoleTemplateDetailDelete = new RoleTemplateDetailDelete(RoleTemplateDetailDeleteObj);

    console.log('============================== Save OP Billing ===========');
    let submitData = {
      "sS_RoleTemplateMasterUpdate": sS_RoleTemplateMasterUpdate,
      "sS_RoleTemplateDetailDelete": sS_RoleTemplateDetailDelete,
      "sS_RoleTemplateDetailSave": roleDetailSaveArr,

    };
    console.log(submitData);
    //   this._registerService.RoleTemplateMasterUpdate(submitData).subscribe(response => {
    //     if (response) {
    //       Swal.fire('Congratulations !', 'Role Template Master data Update Successfully !', 'success').then((result) => {
    //         if (result.isConfirmed) {
    //           this.getSstempletemasterList();
    //         }
    //       });
    //     } else {
    //       Swal.fire('Error !', 'Role Template Master data not Update', 'error');
    //     }
    //    // this.isLoading = '';
    // });


  }

  onRowClick(el) {
    // console.log(el);
    this.resetTree();
    this._registerService.getRoleElementDetails(el.RoleId).subscribe((data: any) => {
      // console.log(data);
      let treeItemsList: any[] = [];
      data.forEach(dataEl => {
        if (dataEl.menu_master_link_name && dataEl.menu_master_link_name != "") {
          treeItemsList.push(dataEl.menu_master_link_name);
        }
        if (dataEl.menu_master_detail_link_name && dataEl.menu_master_detail_link_name != "") {
          treeItemsList.push(dataEl.menu_master_detail_link_name);
        }
        if (dataEl.menu_master_detail_detail_link_name && dataEl.menu_master_detail_detail_link_name != "") {
          treeItemsList.push(dataEl.menu_master_detail_detail_link_name);
        }
      });

      treeItemsList = [...new Set(treeItemsList)];
      for (let i = 0; i < treeItemsList.length; i++) {
        let el = this.treeControl.dataNodes.find(element => element.item === treeItemsList[i]);
        if (el) {
          // this.todoItemSelectionToggle(el);
          // this.treeControl.expand(el)
          this.checklistSelection.toggle(el);
          this.treeControl.expand(el)
        }
      }
    });
  }

  resetTree() {
    console.log(typeof this.treeDataSource)
    this.treeDataSource = null;
    console.log(typeof this.treeDataSource)
    console.log( this.treeDataSource)
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.treeDataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    const menus = this._fuseNavigationService.getCurrentNavigation()[0].children;
    const treeData = {};
    menus.forEach(element => {
      if (element.children && element.children.length > 0) {
        let rootNodeObj = {};
        element.children.forEach(element1 => {
          if (element1.children && element1.children.length > 0) {
            let childrenArr = [];
            element1.children.forEach(element2 => {
              childrenArr.push(element2.title);
            });
            rootNodeObj[`${element1.title}`] = childrenArr;
          } else {
            rootNodeObj[`${element1.title}`] = null;
          }

        });
        treeData[`${element.title}`] = rootNodeObj;
      } else {
        treeData[`${element.title}`] = null;
      }

    });
    TREE_DATA = treeData;

    const data = this.buildFileTree(TREE_DATA, 0);
    this.treeDataSource.data = data;
  }

  onClose(){
    this.dialogRef.close();
  }
}





class RoleDetailSaveObj {
  roleId: number;
  menu_master_id: any;
  menu_master_icon: any;
  menu_master_link_name: any;
  menu_master_action: any;
  menu_master_detail_link_name: any
  menu_master_detail_action: any
  menu_master_detail_detail_link_name: any
  menu_master_detail_detail_action: any
  menu_master_detail_detail_icon: any
  menu_master_detail_icon: any
  addedBy: number;
  roleDetId: number;
  addedByDate: any;

  constructor() {
    this.roleId = 0;
    this.menu_master_id = 0;
    this.menu_master_icon = '';
    this.menu_master_link_name = '';
    this.menu_master_action = '';
    this.menu_master_detail_link_name = '';
    this.menu_master_detail_action = '';
    this.menu_master_detail_detail_link_name = '';
    this.menu_master_detail_detail_action = '';
    this.menu_master_detail_detail_icon = '';
    this.menu_master_detail_icon = '';
    this.addedBy = 0;
    this.roleDetId = 0;
    this.addedByDate = '';
  }

}

class RoleTemplateMasterSave {
  RoleId: number;
  RoleName: String;
  IsDeleted: Boolean;
  AddedBy: Number;
  AddedByDate: any;


  constructor(RoleTemplateMasterSaveObj) {
    this.RoleId = RoleTemplateMasterSaveObj.RoleId || 0;
    this.RoleName = RoleTemplateMasterSaveObj.RoleName || '';
    this.IsDeleted = RoleTemplateMasterSaveObj.IsDeleted || 0;
    this.AddedBy = RoleTemplateMasterSaveObj.AddedBy || 218;
    this.AddedByDate = RoleTemplateMasterSaveObj.AddedByDate || '';

  }

}
class RoleTemplateMasterUpdate {
  RoleId: number;
  RoleName: String;
  IsDeleted: Boolean;
  UpdatedBy: Number;
  UpdatedByDate: any;


  constructor(RoleTemplateMasterUpdateObj) {
    this.RoleId = RoleTemplateMasterUpdateObj.RoleId || 0;
    this.RoleName = RoleTemplateMasterUpdateObj.RoleName || '';
    this.IsDeleted = RoleTemplateMasterUpdateObj.IsDeleted || 0;
    this.UpdatedBy = RoleTemplateMasterUpdateObj.UpdatedBy || 218;
    this.UpdatedByDate = RoleTemplateMasterUpdateObj.UpdatedByDate || '';

  }
}

class RoleTemplateDetailDelete {
  RoleId: number;

  constructor(RoleTemplateMasterDeleteObj) {
    this.RoleId = RoleTemplateMasterDeleteObj.RoleId || 0;

  }

}
class SSRoleTemplate {
  RoleId: Number;
  RoleName: Date;

  constructor(SSRoleTemplate) {
    {
      this.RoleId = SSRoleTemplate.RoleId || '';
      this.RoleName = SSRoleTemplate.RoleName || '';
    }
  }
}