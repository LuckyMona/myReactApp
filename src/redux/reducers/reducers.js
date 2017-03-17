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
	

	// isFetchCreateDocSucc:false, ģ��ѡ��ҳ�棬�첽����ɹ�������ֵ��Ϊtrue 
	isShowDialog1:false,  //ģ��ѡ��ҳ�棬ȷ��ģ�鵯���Ƿ���ʾ
	isShowDialog2:false,  //ģ��ѡ��ҳ�棬����Э��ɹ������Ƿ���ʾ


	// projects ����ҳ��Ŀչʾҳ�����Ϣ
	/*"projects":[
		{"projectID":"11","projectName":"TP803",
		 "docs":["1.0.0","2.0.1"],
		},
		{"projectID":"12","projectName":"TP902",
		 "docs":["�ĵ���IDaa1","�ĵ���IDaa2"],
		},
		{"projectID":"13","projectName":"TP905",
		 "docs":["�ĵ���IDaa1","�ĵ���IDaa2"],
		}
	],*/
	// templates��ģ��ѡ��ҳ�棬����ģ�����Ϣ
	/*"templates":[
		{ 
			"templateID":"t11",
			"rows":[
				{"rowID":"r11", "rowKey":"IMEI", "rowType":"String", "reference":"null", "note":"�豸IMEI��"},
				{"rowID":"r12", "rowKey":"eventlist", "rowType":"String", "reference":"null", "note":"�¼��б�"},
			]
		}
	],*/
	// "selectedTem":"t11",  ��ѡ��ģ��ʱ��state���������һ��key-value

	// modules ��ģ��ѡ��ҳ�����˵������ݣ�����ģ�����Ͱ汾
	modules:[], //��ʼΪ�����飬fetch�����fetch����������
	/*"modules":[
		{
			"moduleID":"Camera",
			"moduleName":"Camera", 
			"versions":["v20161211","v20161212"], 
			// "isSelected":"v12"  ģ��ѡ�к󣬻���������һ��key-value
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

	// tables ��ģ��ѡ��ҳ�����˵���table�����б�
	tables:[], //��ʼΪ�����飬fetch�����fetch����������
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
	// realTables �ǰ���rows��table������ģ��ѡ��ҳ��չʾtable����
	"realTables":[],
	/*"realTables":[
		{
			"tableID":"t1",
			"tableName":"event",
			"moduleID":"Camera",
			"version":"v20161211",
			"rows":[
				{rowKey:"id", rowType:"int", reference:"null", note: "��ʶid"},
				{rowKey:"source", rowType:"String", reference:"null", note: "�¼���Դ(ϵͳ��ĳ����)"},
				{rowKey:"eventid", rowType:"String", reference:"null", note: "�¼�ID"},
				{rowKey:"content", rowType:"String", reference:"null", note: "�¼�����(map��ʽ)"},
				{rowKey:"updateTime", rowType:"long", reference:"null", note: "�¼�����ʱ��"},
				{rowKey:"duration", rowType:"long", reference:"null", note: "�¼�����ʱ��"},
				{rowKey:"count", rowType:"int", reference:"null", note: "�¼�����(Ĭ��Ϊ0�����ʱ��=-1������ʱ��=0�������¼�>=1)"},
		 	]
		},{
			"tableID":"t2",
			"tableName":"filerecord",
			"moduleID":"Camera",
			"version":"v20161211",
			"rows":[
				{rowKey:"filepath", rowType:"String", reference:"null", note: "�ļ�·��"},
				{rowKey:"lastaccesstime", rowType:"String", reference:"null", note: "������ʱ��"},
				{rowKey:"count", rowType:"String", reference:"null", note: "�ش�����"},
				{rowKey:"status", rowType:"int", reference:"null", note: "״̬(0��ʾû�ϴ�����1��ʾ�ϴ���)"},
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

	//selectedItemsForDoc������ѡ��ʱ��ѡ�����
	/*selectedItemsForDoc:{
		selectedProj:action.projID
	},*/

	// �������ɵ�Doc��ÿ����һ��ѡ��ѡ��Ŀ��ѡģ�塢ѡģ�飬�ͻ��޸����������
	/*"docs":[
		{
			isCompleted:true, //�Ƿ�����ɣ����ѡ�񣬲����ύ���˷��������������
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

	// "tablesNewed"��newModuleҳ���������ı���б�
	/*"tablesNewed":[
		{
			"tableTitle":"eventlist", 
			rows:[
					{key:"id", rowType:"int", reference:"null", note: "��ʶid"},
					{key:"source", rowType:"String", reference:"null", note: "�¼���Դ(ϵͳ��ĳ����)"},
					{key:"eventid", rowType:"String", reference:"null", note: "�¼�ID"},
					{key:"content", rowType:"String", reference:"null", note: "�¼�����(map��ʽ)"},
				]
		},
		{
			"tableTitle":"eventlist2", 
			rows:[
					{key:"id", rowType:"int", reference:"null", note: "��ʶid"},
					{key:"source", rowType:"String", reference:"null", note: "�¼���Դ(ϵͳ��ĳ����)"},
					{key:"eventid", rowType:"String", reference:"null", note: "�¼�ID"},
					{key:"content", rowType:"String", reference:"null", note: "�¼�����(map��ʽ)"},
				]
		},
		{
			"tableTitle":"filerecord",
			"rows":[
				{key:"filepath", rowType:"String", reference:"null", note: "�ļ�·��"},
				{key:"lastaccesstime", rowType:"String", reference:"null", note: "������ʱ��"},
				{key:"count", rowType:"String", reference:"null", note: "�ش�����"},
				{key:"status", rowType:"int", reference:"null", note: "״̬(0��ʾû�ϴ�����1��ʾ�ϴ���)"},
		 	]
		}
	],*/

	//modulesToBeCopyed�Ǵ�����ģ�鸴��ʱ����ѡ��ģ�飬���Ǳ�ѡģ�� 
	/*"modulesToBeCopyed":[
		{moduleName:"Camera", versions:["v20161211","v20161212"]},
		{moduleName:"Note", versions:["v20161111-1","v20161111-2"]},
		{moduleName:"Music", versions:["v20160906","v20160911"]},
	],*/

	// docModules��showDocҳ���У�doc������modules
	"docModules":[
		{moduleName:"Camera", moduleVersion:"v20161211"}
	],
	// docTemplates��showDocҳ���У�doc������ģ���rows
	"docTemplates":[
		{key:"IMEI", rowType:"String", reference:"null", note:"�豸IMEI��"},
		{key:"eventlist", rowType:"String", reference:"null", note:"�¼��б�"}
	]
}

function myApp(state=initState, action){

	switch (action.type) {
	    /*case NEW_PROJECT: // �½���Ŀ
	    	let projectsTemp = state.projects.concat({"projectName":action.projectName, "projectID":(new Date()).getTime()});
	    	return Object.assign({},state,{
	    		"projects":projectsTemp
	    	});*/
	    case NEW_TEMPLATE: // �½�ģ��
	    	let templatesTemp = state.templates.concat({
	    		"templateID":state.templates.length,
	    		"rows":action.templateTable
	    	});
	    	return Object.assign({},state,{
	    		"templates":templatesTemp
	    	});
	    case SELECT_TEMPLATE:  // ѡ��ģ��

			let selectTemplState = {}
			console.log(state.docs);
	    		
    		// ��ȡdocs���һ�ƴ��ѡ�е�ģ��ID
    		let lastDocTemp = Object.assign({},state.docs[state.docs.length-1],{
    			templateID:action.templateID
    		})

    		// ��docs�����һ���滻���������
    		let docsCopied = state.docs.concat([]);	// ��ȡdocs�������

    		docsCopied.splice(-1);	// docs�������ȥ���һ��

    		selectTemplState = Object.assign({}, state,{
    			docs:docsCopied.concat(lastDocTemp) // docs����������  ƴ�ϱ�ѡģ���doc��
    		})
    		console.log(selectTemplState.docs);
	    	
	    	return selectTemplState

	    case SHOW_TABLE:  //selectModule �л�table��ʱ��table������Ӧ�ı�
	    	return Object.assign({},state,{
	    		"tableShowed":action.table
	    	});
	    case TOGGLE_SELECT:// selectModule �л�checkbox
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
				    			// ���ѡ����ģ������һ�����ԣ�isSelected:v11������������
				    			return Object.assign({},item,{"isSelected": action.selectedParams.version})	
				    		}
				    		else if(item.moduleID===action.selectedParams.moduleID
				    			&& action.selectedParams.isSelected===false)
				    		{	
				    			// �����ѡ��ģ�飬��isSelectedֵ��Ϊfalse
				    			console.log("else if")
				    			return Object.assign({},item,{"isSelected": false})
				    		}
				    		//console.log("neither");
				    		return item;
				    	})
	    	});
	    	console.log(stateTemp);
	    	return stateTemp

	    case SELECT_PROJ:    //ShowProjects�½�Э��ʱ��ѡ����Ŀ
	    	// console.log("action.projID:"+action.projID);
	    	
	    	// ����½�Э��ʱ���Ѿ���δ��ɵ�Э�飬��Ҫ��������½�
	    	let projDocsCopied = state.docs.concat([]);
	    	
	    	if(projDocsCopied[projDocsCopied.length-1].isCompleted===false){
	    		
	    		projDocsCopied.pop();
	    	}
	    	let selectProjState = Object.assign({}, state,{
	    		docs:projDocsCopied.concat({	//����һ�����Ʒdoc�������ѡ���proj
	    			isCompleted:false, 
					projID:action.projID,
					projName:action.projName
	    		})
	    	})
	    	console.log(selectProjState.docs);
	    	return selectProjState

	    case GENERATE_DOC:    //ѡ��ģ��ҳ��ʱ���������Э�飬����ѡ���ģ�鵽store
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

	    case CLEAR_MODULES:    // ģ��ѡ��ҳ��ȷ����ѡ���ģ��ʱ���������ģ���ѡ��״̬
	    	let clearModulesState = Object.assign({}, state, {
	    		modules:state.modules.map((item, index)=>{
		    		return Object.assign({},item,{
		    			isSelected:false
		    		})
		    	})
	    	});
	    	return clearModulesState

	    case COMPLETE_DOC: // ��docs�����һ���isCompleted��Ϊtrue������docID
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
	    case SAVE_MODULE_SUCC:  // ����ģ��ʱ������ģ��
	    	let moduleData = action.moduleData;
	    	
	    	/*
	    	moduleData��ʽ��
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
					"tableID": tableID  //����̨���ص�tableID�������ر����table����
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
	    		// moduleID��Ϊnull��֤���û��ı���moduleName�������µ�module
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
	    		// moduleIDΪnull, ֤���û�û�иı�moduleName, ������ԭmodule��һ���°汾
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
	    case SAVE_COPIED_MODULE: // ����ģ��ʱ���޸ĺ󱣴�ģ��
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
	    		// ����modules
	    		let updatedModules = state.modules.map((item, index)=>{
	    				if(item.moduleID===copiedModule.newModule.moduleID){
	    					return copiedModule.newModule
	    				}
	    				return item
	    			})
	    		//console.log(updatedModules)

	    		// ����tables
	    		let originTables = state.tables.concat([])
	    		console.log(originTables);
	    			// ���ϱ���ģ������ĵ�tables
	    		originTables = originTables.concat(copiedModule.tables)

	    		// ����realTables
	    		let originRealTables = state.realTables.concat([])
	    		console.log(originRealTables)
	    			// ���ϱ���ģ������ĵ�tables
	    		originRealTables = originRealTables.concat(copiedModule.realTables)
	    		console.log(originRealTables)

	    		// �Ѵ���������ݷ��أ��Ա��浽store��
	    		let copyModuleState = Object.assign({}, state, {
	    			"modules" : updatedModules,
	    			"tables" : originTables,
	    			"realTables" : originRealTables
	    		})
	    		console.log(copyModuleState)
	    		return copyModuleState
	    	}
	    case RECEIVE_PROJ://��Ŀչʾҳ�棬�첽������Ŀ�б�����ɹ�
	    	console.log(action.json)
	    	return Object.assign({}, state, action.json)    //����������projects��documents����state
	    case NEW_PROJECT_SUCC: //�½���Ŀ���첽����ɹ�
	    	console.log(action.projectID)
	    	console.log(action.projectName)
	    	
	    	let newProject = state.projects.concat({
	    		"projectID":action.projectID,
	    		"projectName":action.projectName
	    	})
	    	return Object.assign({},state,{
	    		projects:newProject
	    	})
	    case RECEIVE_TEMPLATES: //ģ��ѡ��ҳ�棬�첽����ģ���б�����ɹ�
	    	console.log(action.json)
	    	return Object.assign({},state,action.json)
	    case NEW_TEMPLATE_SUCC: //�½�ģ��,�첽����ɹ�
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
	    //ģ��ѡ��ҳ�棬�½�Э���첽����ɹ�

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