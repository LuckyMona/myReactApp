import { combineReducers } from 'redux'
import { 
	NEW_PROJECT, 
	NEW_TEMPLATE, 
	SELECT_TEMPLATE,
	SHOW_TABLE,
	TOGGLE_SELECT,
	SELECT_PROJ,
	GENERATE_DOC,
	CLEAR_MODULES,
	COMPLETE_DOC,
	// SAVE_MODULE,
	SAVE_COPIED_MODULE,
	RECEIVE_PROJ,
	NEW_PROJECT_SUCC,
	RECEIVE_TEMPLATES,
	NEW_TEMPLATE_SUCC,
	SHOW_DIALOG1,
	SHOW_DIALOG2,
	CLOSE_DIALOG1,
	CLOSE_DIALOG2,
	FETCH_MODULES_SUCC,
	FETCH_REAL_TABLES_SUCC,
	SAVE_MODULE_SUCC
	/*FETCH_CREATE_DOC_SUCC*/ } from '../actions/Actions'

const initState = {
	

	// isFetchCreateDocSucc:false, 模板选择页面，异步请求成功会把这个值改为true 
	isShowDialog1:false,  //模块选择页面，确认模块弹窗是否显示
	isShowDialog2:false,  //模块选择页面，生成协议成功弹窗是否显示


	// projects 是首页项目展示页面的信息
	/*"projects":[
		{"projectID":"11","projectName":"TP803",
		 "docs":["1.0.0","2.0.1"],
		},
		{"projectID":"12","projectName":"TP902",
		 "docs":["文档名IDaa1","文档名IDaa2"],
		},
		{"projectID":"13","projectName":"TP905",
		 "docs":["文档名IDaa1","文档名IDaa2"],
		}
	],*/
	// templates是模板选择页面，所有模板的信息
	/*"templates":[
		{ 
			"templateID":"t11",
			"rows":[
				{"rowID":"r11", "rowKey":"IMEI", "rowType":"String", "reference":"null", "note":"设备IMEI号"},
				{"rowID":"r12", "rowKey":"eventlist", "rowType":"String", "reference":"null", "note":"事件列表"},
			]
		}
	],*/
	// "selectedTem":"t11",  当选择模板时，state里会多出这样一对key-value

	// modules 是模块选择页面左侧菜单的数据，包含模块名和版本
	modules:[], //初始为空数组，fetch后就是fetch来的数据了
	/*"modules":[
		{
			"moduleID":"Camera",
			"moduleName":"Camera", 
			"versions":["v20161211","v20161212"], 
			// "isSelected":"v12"  模块选中后，会增添这样一对key-value
		}*//*,
		{
			"moduleID":"m02",
			"moduleName":"Note", 
			"versions":["v20161111-1","v20161111-2"], 
		},{
			"moduleID":"m03",
			"moduleName":"Music", 
			"versions":["v20160906","v20160911"], 
		}
	],*/

	// tables 是模块选择页面左侧菜单的table名称列表
	tables:[], //初始为空数组，fetch后就是fetch来的数据了
	/*"tables":[
		{
			"moduleID": "Camera",
			"version": "v20161211",
			"tableName": "event",
			"tableID": "t1"
		},{
			"moduleID": "Camera",
			"version": "v20161211",
			"tableName": "filerecord",
			"tableID": "t2"
		},{
			"moduleID": "Camera",
			"version": "v20161212",
			"tableName": "xxx11",
			"tableID": "t1"
		}
	],*/
	// realTables 是包含rows的table，用于模块选择页面展示table详情
	"realTables":[],
	/*"realTables":[
		{
			"tableID":"t1",
			"tableName":"event",
			"moduleID":"Camera",
			"version":"v20161211",
			"rows":[
				{rowKey:"id", rowType:"int", reference:"null", note: "标识id"},
				{rowKey:"source", rowType:"String", reference:"null", note: "事件来源(系统或某程序)"},
				{rowKey:"eventid", rowType:"String", reference:"null", note: "事件ID"},
				{rowKey:"content", rowType:"String", reference:"null", note: "事件内容(map形式)"},
				{rowKey:"updateTime", rowType:"long", reference:"null", note: "事件更新时间"},
				{rowKey:"duration", rowType:"long", reference:"null", note: "事件持续时间"},
				{rowKey:"count", rowType:"int", reference:"null", note: "事件次数(默认为0，最近时间=-1，计算时间=0，计数事件>=1)"},
		 	]
		},{
			"tableID":"t2",
			"tableName":"filerecord",
			"moduleID":"Camera",
			"version":"v20161211",
			"rows":[
				{rowKey:"filepath", rowType:"String", reference:"null", note: "文件路径"},
				{rowKey:"lastaccesstime", rowType:"String", reference:"null", note: "最后访问时间"},
				{rowKey:"count", rowType:"String", reference:"null", note: "重传次数"},
				{rowKey:"status", rowType:"int", reference:"null", note: "状态(0表示没上传过，1表示上传过)"},
		 	]
		},{
			"tableID":"t1",
			"tableName":"xxx11",
			"moduleID":"Camera",
			"version":"v20161212",
			"rows":[
				{rowKey:"rowdsa2", rowType:"String", reference:"aa", note: "asd"},
				{rowKey:"dfa", rowType:"Number", reference:"sss", note: "ere"},
				{rowKey:"dfasdafsdfa", rowType:"String", reference:"sss", note: "da"},
		 	]
		}
	],*/

	//selectedItemsForDoc是三次选择时，选择的项
	/*selectedItemsForDoc:{
		selectedProj:action.projID
	},*/

	// 所有生成的Doc，每做出一个选择：选项目、选模板、选模块，就会修改这里的数据
	/*"docs":[
		{
			isCompleted:true, //是否已完成，三项都选择，并且提交到了服务器，就算完成
			docID:"111",

			projID:"11",
			projName:"TP803",
			
			templateID:"t11",
			modules:[
				{
					moduleID:"m11",
					moduleName:"xxx",
					version:"v11",
				}
			]
		},
	],*/

	// "tablesNewed"是newModule页面中新增的表格列表
	/*"tablesNewed":[
		{
			"tableTitle":"eventlist", 
			rows:[
					{key:"id", rowType:"int", reference:"null", note: "标识id"},
					{key:"source", rowType:"String", reference:"null", note: "事件来源(系统或某程序)"},
					{key:"eventid", rowType:"String", reference:"null", note: "事件ID"},
					{key:"content", rowType:"String", reference:"null", note: "事件内容(map形式)"},
				]
		},
		{
			"tableTitle":"eventlist2", 
			rows:[
					{key:"id", rowType:"int", reference:"null", note: "标识id"},
					{key:"source", rowType:"String", reference:"null", note: "事件来源(系统或某程序)"},
					{key:"eventid", rowType:"String", reference:"null", note: "事件ID"},
					{key:"content", rowType:"String", reference:"null", note: "事件内容(map形式)"},
				]
		},
		{
			"tableTitle":"filerecord",
			"rows":[
				{key:"filepath", rowType:"String", reference:"null", note: "文件路径"},
				{key:"lastaccesstime", rowType:"String", reference:"null", note: "最后访问时间"},
				{key:"count", rowType:"String", reference:"null", note: "重传次数"},
				{key:"status", rowType:"int", reference:"null", note: "状态(0表示没上传过，1表示上传过)"},
		 	]
		}
	],*/

	//modulesToBeCopyed是从已有模块复制时，先选择模块，这是备选模块 
	/*"modulesToBeCopyed":[
		{moduleName:"Camera", versions:["v20161211","v20161212"]},
		{moduleName:"Note", versions:["v20161111-1","v20161111-2"]},
		{moduleName:"Music", versions:["v20160906","v20160911"]},
	],*/

	// docModules是showDoc页面中，doc包含的modules
	"docModules":[
		{moduleName:"Camera", moduleVersion:"v20161211"}
	],
	// docTemplates是showDoc页面中，doc包含的模板的rows
	"docTemplates":[
		{key:"IMEI", rowType:"String", reference:"null", note:"设备IMEI号"},
		{key:"eventlist", rowType:"String", reference:"null", note:"事件列表"}
	]
}

function myApp(state=initState, action){

	switch (action.type) {
	    /*case NEW_PROJECT: // 新建项目
	    	let projectsTemp = state.projects.concat({"projectName":action.projectName, "projectID":(new Date()).getTime()});
	    	return Object.assign({},state,{
	    		"projects":projectsTemp
	    	});*/
	    case NEW_TEMPLATE: // 新建模板
	    	let templatesTemp = state.templates.concat({
	    		"templateID":state.templates.length,
	    		"rows":action.templateTable
	    	});
	    	return Object.assign({},state,{
	    		"templates":templatesTemp
	    	});
	    case SELECT_TEMPLATE:  // 选择模板

			let selectTemplState = {}
			console.log(state.docs);
	    		
    		// 获取docs最后一项并拼入选中的模板ID
    		let lastDocTemp = Object.assign({},state.docs[state.docs.length-1],{
    			templateID:action.templateID
    		})

    		// 把docs的最后一项替换成上面的项
    		let docsCopied = state.docs.concat([]);	// 获取docs深拷贝数组

    		docsCopied.splice(-1);	// docs深拷贝数组去最后一项

    		selectTemplState = Object.assign({}, state,{
    			docs:docsCopied.concat(lastDocTemp) // docs深拷贝数组加上  拼上被选模板的doc项
    		})
    		console.log(selectTemplState.docs);
	    	
	    	return selectTemplState

	    case SHOW_TABLE:  //selectModule 切换table名时，table详情相应改变
	    	return Object.assign({},state,{
	    		"tableShowed":action.table
	    	});
	    case TOGGLE_SELECT:// selectModule 切换checkbox
	    	console.log(action.selectedParams);
	    	console.log(state.modules[2]);
	    	
	    	let stateTemp = Object.assign({},state,{
	    		modules:state.modules.map((item,index)=>{
	    					//console.log(item);
	    					if(item.moduleID===action.selectedParams.moduleID 
				    			&& item.versions.indexOf(action.selectedParams.version.substr(2))!==-1
				    			&& action.selectedParams.isSelected===true)
				    		{
				    			console.log("if")
				    			// 如果选择了模块就添加一对属性：isSelected:v11，否则不做处理
				    			return Object.assign({},item,{"isSelected": action.selectedParams.version})	
				    		}
				    		else if(item.moduleID===action.selectedParams.moduleID
				    			&& action.selectedParams.isSelected===false)
				    		{	
				    			// 如果不选了模块，把isSelected值设为false
				    			console.log("else if")
				    			return Object.assign({},item,{"isSelected": false})
				    		}
				    		//console.log("neither");
				    		return item;
				    	})
	    	});
	    	console.log(stateTemp);
	    	return stateTemp

	    case SELECT_PROJ:    //ShowProjects新建协议时，选择项目
	    	// console.log("action.projID:"+action.projID);
	    	
	    	// 如果新建协议时，已经有未完成的协议，就要先清掉再新建
	    	let projDocsCopied = state.docs.concat([]);
	    	
	    	if(projDocsCopied[projDocsCopied.length-1].isCompleted===false){
	    		
	    		projDocsCopied.pop();
	    	}
	    	let selectProjState = Object.assign({}, state,{
	    		docs:projDocsCopied.concat({	//新增一个半成品doc，填充已选择的proj
	    			isCompleted:false, 
					projID:action.projID,
					projName:action.projName
	    		})
	    	})
	    	console.log(selectProjState.docs);
	    	return selectProjState

	    case GENERATE_DOC:    //选择模块页面时，点击生成协议，传递选择的模块到store
	    	let selectedModules = state.modules.filter((item, index)=>{
				return (typeof item.isSelected === "string")
			})

	    	console.log(state.docs);
	    	let genDocsCopied = state.docs.concat([]);

	    	let lastDoc = genDocsCopied[genDocsCopied.length-1];

	    	console.log(lastDoc.isCompleted);
	    	console.log(lastDoc);
	    	
	    	if(lastDoc.isCompleted===false){
	    		console.log(selectedModules);
	    		lastDoc.modules = selectedModules;
	    	}
	    	let genDocState = Object.assign({}, state, {
	    		"docs":genDocsCopied
	    	})

	    	console.log(genDocState);
	    	return genDocState;

	    case CLEAR_MODULES:    // 模块选择页，确认已选择的模块时，清除所有模块的选中状态
	    	let clearModulesState = Object.assign({}, state, {
	    		modules:state.modules.map((item, index)=>{
		    		return Object.assign({},item,{
		    			isSelected:false
		    		})
		    	})
	    	});
	    	return clearModulesState

	    case COMPLETE_DOC: // 把docs的最后一项的isCompleted设为true，加上docID
	    	console.log("COMPLETE_DOC");
	    	let compDocsCopied = state.docs.concat([]);
	    	let lastDocCopied = compDocsCopied[compDocsCopied.length-1];

	    	lastDocCopied.isCompleted = true;
	    	//lastDocCopied.docID = (new Date()).getTime();
	    	lastDocCopied.docID = action.docID;

	    	let compDocState = Object.assign({}, state, {
	    		docs:compDocsCopied
	    	});
	    	console.log(compDocState);
	    	return compDocState;
	    case SAVE_MODULE_SUCC:  // 新增模块时，保存模块
	    	let moduleData = action.moduleData;
	    	
	    	/*
	    	moduleData格式：
				{
					"newModuleName":"dsafdf",
				    "tables":[{
							tableName: "xx",
					        tableRows: tableRowsData
				    	}, {}, ...]
				}
			*/
	    	console.log(moduleData)
	    	console.log(action.json)
	    	let thisTables = state.tables.concat([])
	    	let thisRealTables = state.realTables.concat([])
	    	
	    	moduleData.tables.forEach((item, index)=>{

	    		let tableID = action.json.tableName_ID[item.tableName] 
	    		thisTables.push({
	    			"moduleID": action.json.moduleID,  
					"version": action.json.moduleVersion,
					"tableName": item.tableName,
					"tableID": tableID  //将后台返回的tableID塞进本地保存的table内容
	    		});
	    		
	    		thisRealTables.push({
	    			"tableID":tableID,
					"tableName":item.tableName,
					"moduleID": action.json.moduleID,
					"version": action.json.moduleVersion,
					"rows":item.tableRows
	    		});
	    	});
	    	
	    	/*console.log(thisTables);
	    	console.log(thisRealTables);*/

	    	var saveModuleState = {}
	    	if(action.json.moduleID){
	    		// moduleID不为null，证明用户改变了moduleName，生成新的module
	    		console.log("get a new module");
		    	let newModule = {
		    		"moduleID":action.json.moduleID,
					"moduleName":moduleData.newModuleName, 
					"versions":[action.json.moduleVersion], 
		    	}
		    	// console.log(thisModule);
		    	saveModuleState = Object.assign({}, state, {
		    		modules:state.modules.concat(newModule),
		    		tables:thisTables,
		    		realTables:thisRealTables
		    	})
	    	}else{
	    		// moduleID为null, 证明用户没有改变moduleName, 仅生成原module的一个新版本
	    		console.log("get a new version")
	    		let newModules = state.modules.map((item, index)=>{
		    			if(item.moduleName === moduleData.newModuleName){
		    				return {
		    					"moduleID":item.moduleID,
		    					"moduleName":moduleData.newModuleName, 
								"versions":[action.json.moduleVersion],
		    				}
		    			}
		    			return item
		    		})

	    		saveModuleState = Object.assign({}, state, {
		    		modules:newModules,
		    		tables:thisTables,
		    		realTables:thisRealTables
		    	})
	    	}

	    	console.log(saveModuleState);
	    	return saveModuleState
	    case SAVE_COPIED_MODULE: // 复制模块时，修改后保存模块
	    	let copiedModule = action.moduleData
	    	console.log(copiedModule)

	    	if(copiedModule.isChangeModuleName){
	    		let copyModuleState = Object.assign({}, state, {
	    			"modules":state.modules.concat([copiedModule.newModule]),
	    			"tables":state.tables.concat(copiedModule.tables),
	    			"realTables":state.realTables.concat(copiedModule.realTables)
	    		})
	    		console.log(copyModuleState);
	    		return copyModuleState
	    	}else{
	    		// 处理modules
	    		let updatedModules = state.modules.map((item, index)=>{
	    				if(item.moduleID===copiedModule.newModule.moduleID){
	    					return copiedModule.newModule
	    				}
	    				return item
	    			})
	    		//console.log(updatedModules)

	    		// 处理tables
	    		let originTables = state.tables.concat([])
	    		console.log(originTables);
	    			// 添上保存模块得来的的tables
	    		originTables = originTables.concat(copiedModule.tables)

	    		// 处理realTables
	    		let originRealTables = state.realTables.concat([])
	    		console.log(originRealTables)
	    			// 添上保存模块得来的的tables
	    		originRealTables = originRealTables.concat(copiedModule.realTables)
	    		console.log(originRealTables)

	    		// 把处理完的数据返回，以保存到store中
	    		let copyModuleState = Object.assign({}, state, {
	    			"modules" : updatedModules,
	    			"tables" : originTables,
	    			"realTables" : originRealTables
	    		})
	    		console.log(copyModuleState)
	    		return copyModuleState
	    	}
	    case RECEIVE_PROJ://项目展示页面，异步请求项目列表，请求成功
	    	console.log(action.json)
	    	return Object.assign({}, state, action.json)    //把请求来的projects和documents并入state
	    case NEW_PROJECT_SUCC: //新建项目，异步请求成功
	    	console.log(action.projectID)
	    	console.log(action.projectName)
	    	
	    	let newProject = state.projects.concat({
	    		"projectID":action.projectID,
	    		"projectName":action.projectName
	    	})
	    	return Object.assign({},state,{
	    		projects:newProject
	    	})
	    case RECEIVE_TEMPLATES: //模板选择页面，异步请求模板列表，请求成功
	    	console.log(action.json)
	    	return Object.assign({},state,action.json)
	    case NEW_TEMPLATE_SUCC: //新建模板,异步请求成功
	    	console.log(action.templateID)
	    	console.log(action.templateTable)
	    	let newTemplates = state.templates.concat(
	    		{
					"templateID":action.templateID,
					"rows":action.templateTable
				}
	    	)
	    	return Object.assign({}, state, {
	    		templates:newTemplates
	    	})
	    /*case FETCH_CREATE_DOC_SUCC: 
	    //模块选择页面，新建协议异步请求成功

	    	return Object.assign({}, state, {
	    		isFetchCreateDocSucc:true
	    	})*/
    	case SHOW_DIALOG1:
    		console.log("show dialog1")
	    	return Object.assign({}, state, {
	    		isShowDialog1:true
	    	})
	    case CLOSE_DIALOG1:

	    	return Object.assign({}, state, {
	    		isShowDialog1:false
	    	})
	    case SHOW_DIALOG2:
	    	console.log("action SHOW_DIALOG2")
	    	return Object.assign({}, state, {
	    		isShowDialog1:false,
	    		isShowDialog2:true
	    	})
	    case CLOSE_DIALOG2:
	    	return Object.assign({}, state, {
	    		isShowDialog2:false
	    	})
    	case FETCH_MODULES_SUCC:
	    	return Object.assign({}, state, {
	    		modules:action.modules_tables.modules,
	    		tables:action.modules_tables.tables
	    	})
	    case FETCH_REAL_TABLES_SUCC:
	    	return Object.assign({}, state, {
	    		realTables:action.realTables
	    	})    
	    default:
	      	return state
  	}
}

/*const myApp = combineReducers({
  visibilityFilter,
  todos
})*/

export default myApp