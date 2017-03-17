import React from 'react';
import ReactDOM from 'react-dom';
import newModule from "../less_css/newModule.css";
import handleChange from '../utils/handleChange.js';
import ModuleNameInput from './ModuleNameInput.js';
import {Link} from 'react-router';

var TableG = React.createClass({
    getInitialState:function(){
        return {
            /*tableName:this.props.table.tableName,*/
            rows:this.props.table.rows, 
            selectedRow:"",
            rowsData:[]
        }
    },
    /*componentDidMount:function(){
        this.setState({
            tableName:this.props.table.tableName,
            rows:this.props.table.rows
        })
    },*/
    componentWillReceiveProps:function(nextProps){
        // console.log(nextProps.table);
        // alert("componentWillReceiveProps")
        this.setState({
            /*"tableName":nextProps.table.tableName,*/
            "rows":nextProps.table.rows
        })
    },
    componentDidUpdate:function(prevProps, prevState){
        //alert("componentDidUpdate")
        // TODO: 每次修改了table的内容都要通知父组件，并把修改后的表格内容存到父组件的state中
        /*if(prevState.tableName===this.state.tableName&&
            prevState.rows == this.state.rows)*/
    },

    delTable:function(){
        this.props.delTable();
    },
    newRow:function(){
        let prevRows = this.state.rows.concat([])
        let nextRows = prevRows.concat({
            rowKey:"",
            rowType:"",
            reference:"",
            note:""
        });
        this.setState({
            rows:nextRows
        })
    },
    selectRow:function(index){
        this.setState({
            selectedRow:index
        })
    },
    deleteRow:function(){
        let selectedRow = this.state.selectedRow
        if(selectedRow!==""){
            console.log("delRow!")
            console.log(selectedRow)
            let prevRows = this.state.rows.concat([])
            prevRows[selectedRow]="";
            this.setState({
                rows:prevRows
            })
        }else{
            alert("请先选择行！");
        }
    },
    getTableName:function(){
        // console.log(this.refs.tableName.value)
        return this.refs.tableName.value;
    },
    getRowsData:function(){
        let rowsData = []
        for(let refItem in this.refs){
            if(refItem.indexOf("_tr")!== -1){
                //console.log(refItem);
                let inputs = this.refs[refItem].getElementsByTagName("input")
                //console.log(inputs);
                rowsData.push({
                    "rowKey":inputs[0].value,
                    "rowType":inputs[1].value,
                    "reference":inputs[2].value,
                    "note":inputs[3].value
                }) 
            }
        }
        console.log(rowsData);
        return rowsData
    },
    handleRowsInputChange:function(){
        //alert("handleInputChange");
        // 通知父组件，说这个表格的rows内容发生了改变
        this.props.tableRowsChanged();
    },
    handleTableNameChange:function(){
        // 通知父组件，说这个表格的tableName发生了改变

        this.props.tableNameChanged();
    },
    render:function(){
        /*alert("render")*/
        return(
            <div className="tableWrap">
                <div className="tableNameW">
                    <p>表名：
                        <input 
                            ref="tableName" 
                            type="text"
                            name="tableName"
                            defaultValue={this.props.table.tableName}
                            onChange={this.handleTableNameChange} />
                    </p>
                    
                    <div>
                        <button type="button" onClick={this.delTable} className="btn btn-info mr10">删除表</button>
                        <button type="button" onClick={this.newRow} className="btn btn-info mr10">新增行</button>
                        <button type="button" onClick={this.deleteRow} className="btn btn-info mr10">删除行</button>
                    </div>
                </div>
                <table className="table_myThDark">
                    <tbody>
                        <tr>
                            <th>名称</th>
                            <th>类型</th>
                            <th>引用</th>
                            <th>描述</th>
                        </tr>
                        {
                            this.state.rows.map((item, index)=>{
                                if(item!==""){
                                    return(<tr ref={index+"_tr"} className={this.state.selectedRow===index?"activeRow":""} onClick={this.selectRow.bind(null, index)} key={index}>
                                            <td>
                                                <input 
                                                    type="text"
                                                    defaultValue={item.rowKey}
                                                    onChange={this.handleRowsInputChange} 
                                                    className="tableInpt" />
                                            </td>
                                            <td>
                                                <input 
                                                    type="text" 
                                                    defaultValue={item.rowType} 
                                                    onChange={this.handleRowsInputChange}
                                                    className="tableInpt" />
                                            </td>
                                            <td>
                                                <input 
                                                    type="text" 
                                                    defaultValue={item.reference} 
                                                    onChange={this.handleRowsInputChange}
                                                    className="tableInpt" />
                                            </td>
                                            <td>
                                                <input 
                                                    type="text" 
                                                    defaultValue={item.note} 
                                                    onChange={this.handleRowsInputChange}
                                                    className="tableInpt" />
                                            </td>
                                        </tr>)
                                }
                            })
                        }

                    </tbody>
                </table>
            </div>
        );
    }
});

var ChangeModule = React.createClass({
    getInitialState:function(){
        console.log(this.props.params.moduleID)
        console.log(this.props.params.selectedVer)
        
        // 根据url的传参过滤出要修改的模块
        let thisModule = this.props.modules.filter((module, index) => {
            return(module.moduleID == this.props.params.moduleID)
        })
        console.log(thisModule);

        let thisModuleVer = this.props.params.selectedVer
        console.log(thisModuleVer);

        // 取出这个版本的模块包含的所有表格的内容
        console.log(this.props.realTables);
        let thisRealTables = this.props.realTables.filter((table, index) => {
            return(table.moduleID==thisModule[0].moduleID && table.version==thisModuleVer)
        })

        console.log(thisRealTables);

        return({
            "moduleName":thisModule[0].moduleName,
            "thisModule":thisModule[0],
            "thisModuleVer":thisModuleVer,
            "thisRealTables":thisRealTables,
        })
    },

    newTable:function(){
        
        // 把最后一个表格的内容保存
        let realTablesCopied = this.state.thisRealTables.concat([])         
        let lastTable = this.refs[(realTablesCopied.length-1)+"_TableG"]
        if(lastTable){
            realTablesCopied[realTablesCopied.length-1]={
                "tableName":lastTable.getTableName().trim(),
                "rows":lastTable.getRowsData()
            }
        }

        // 新增一个空白表格
        let newedTable = {
                "tableName":"",
                "rows":[]
        }

        console.log(newedTable);
        this.setState({
            thisRealTables:realTablesCopied.concat(newedTable)
        });
    },
    delTable:function(index){
        
        // 把最后一个表格的内容保存
        let realTablesCopied = this.state.thisRealTables.concat([])         
        let lastTable = this.refs[(realTablesCopied.length-1)+"_TableG"]
        if(lastTable){
            realTablesCopied[realTablesCopied.length-1]={
                "tableName":lastTable.getTableName().trim(),
                "rows":lastTable.getRowsData()
            }
        }

        realTablesCopied.splice(index,1);
        this.setState({
            "thisRealTables":realTablesCopied
        })
    },
    handleTableRowsChanged:function(index){
        //当子table的行内容发生改变时，会调用这个方法，来更新这个table的内容
        let realTablesCopied = this.state.thisRealTables.concat([])
        realTablesCopied[index].rows = this.refs[index+"_TableG"].getRowsData();
        this.setState({
            thisRealTables:realTablesCopied
        })
    },
    handleTableNameChanged:function(index){
        // 当子table的tableName发生改变时，会调用这个方法，来更新这个table的tableName
        let realTablesCopied = this.state.thisRealTables.concat([])
        realTablesCopied[index].tableName = this.refs[index+"_TableG"].getTableName()
        this.setState({
            thisRealTables:realTablesCopied
        })
    },
    saveModule:function(){
        let moduleData = {};
        let originModule = this.state.thisModule

        let newModuleName = this.refs.ModuleNameInput.getValue();
        // TODO:检查用户是否修改了模块数据，改变了才进行下面的流程

        let getModuleData = ()=>{
            // 处理module  TODO: getTime 变为年月日
            // let newVersion = (new Date()).getTime()+"";
            let newModule = {}

            /*if(isChangeModuleName){
                // 不论moduleName是否改变，后台都需要返回新的moduleVersion
                // 改变了moduleName, 后台需要返回moduleID，否则不需要
                newModule = {
                    // 使用了Name作为ID
                    // moduleID:newModuleName,
                    moduleName:newModuleName,
                    // versions:[newVersion]
                }
                alert("changedModuleName");
                console.log(newModule);
            }else{
                // moduleName不变
                newModule = Object.assign({}, originModule, {
                    isSelected:false,
                    versions:originModule.versions.concat(newVersion)
                })
                alert("notChangedModuleName");
                console.log(newModule);
            }*/
        
            // 处理tables
            let thisTables = [];
            let realTables = [];
            let tables = []
            //console.log(this.refs);
            //console.log(this.refs.moduleName);

            for(let refItem in this.refs ){
                if(refItem.indexOf("_TableG")!==-1){

                    let tableName = this.refs[refItem].getTableName(); 
                    let tableRowsData = this.refs[refItem].getRowsData();

                    tables.push({
                        
                            tableName: tableName,
                            tableRows: tableRowsData

                    })



                    // 使用了Name作为ID
                    thisTables.push({
                        // "moduleID": newModuleName, // 使用了Name作为ID
                        // "version": newVersion,
                        "tableName": tableName,
                        // "tableID": tableName
                    })
                    realTables.push({
                        // "tableID":tableName,
                        "tableName":tableName,
                        // "moduleID":newModuleName, // 使用了Name作为ID
                        // "version":newVersion,
                        "rows":tableRowsData
                    })
                }
            }
            /*console.log(thisTables);
            console.log(realTables);
            console.log(tables);*/

            // 把修改后的模块信息保存到store
            this.props.saveCopiedModule({
                // "isChangeModuleName":isChangeModuleName,
                // "originModuleVer":this.props.params.selectedVer,
                // "newModule":newModuleName, 
                // "tables":thisTables, 
                // "realTables":realTables
                "newModuleName":newModuleName,
                "tables":tables
            })
        }
        //不区分是否修改了moduleName，根据moduleName是否可以在store的modules中找到来判断是否是新建模块
        getModuleData();

       /* let isChangeModuleName = newModuleName!==originModule.moduleName
        if(newModuleName!=="" && !isChangeModuleName){
            // moduleName没有改变，生成原有module的新版本
            getModuleData(false)
            
        }else if(newModuleName!=="" && isChangeModuleName){
            //moduleName发生改变，生成新module
            getModuleData(true)
        }*/
        
    },

    render:function(){
        
        return(
            <div className="main_center border newModule changeModule">
                <header>
                    <ModuleNameInput 
                        moduleName={this.state.moduleName}
                        ref="ModuleNameInput" />
                    <div onClick={this.newTable} className="addTable">新增<br />表格</div>
                </header>
                <section className="clearfix">
                    {
                        this.state.thisRealTables.map((table,index)=>{
                            return <TableG 
                                key={index} 
                                table={table}
                                ref={index+"_TableG"}
                                tableRowsChanged = {this.handleTableRowsChanged.bind(null, index)}
                                tableNameChanged = { this.handleTableNameChanged.bind(null, index)}
                                delTable={this.delTable.bind(null, index)} />
                        })
                    }
                </section>
                <footer>
                    <button type="button" onClick={this.saveModule} className="btn btn-primary"><Link to="/selectModule">保存模块</Link></button>
                </footer>
            </div>
        );
    }
});

export default ChangeModule