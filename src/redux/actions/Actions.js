import fetch from 'isomorphic-fetch'

export const NEW_PROJECT = "NEW_PROJECT";
export const NEW_TEMPLATE = "NEW_TEMPLATE";
export const SELECT_TEMPLATE = "SELECT_TEMPLATE";
export const SHOW_TABLE = "SHOW_TABLE";
export const TOGGLE_SELECT = "TOGGLE_SELECT";
export const SELECT_PROJ = "SELECT_PROJ";
export const GENERATE_DOC = "GENERATE_DOC";
export const CLEAR_MODULES = "CLEAR_MODULES";
export const COMPLETE_DOC = "COMPLETE_DOC";
export const SAVE_MODULE = "SAVE_MODULE";
export const SAVE_COPIED_MODULE = "SAVE_COPIED_MODULE";
export const RECEIVE_PROJ = "RECEIVE_PROJ";
export const NEW_PROJECT_SUCC = "NEW_PROJECT_SUCC";
export const RECEIVE_TEMPLATES = "RECEIVE_TEMPLATES";
export const NEW_TEMPLATE_SUCC = "NEW_TEMPLATE_SUCC";
export const FETCH_CREATE_DOC_SUCC = "FETCH_CREATE_DOC_SUCC";
export const SHOW_DIALOG1 = "SHOW_DIALOG1";
export const SHOW_DIALOG2 = "SHOW_DIALOG2";
export const CLOSE_DIALOG1 = "CLOSE_DIALOG1";
export const CLOSE_DIALOG2 = "CLOSE_DIALOG2";
export const FETCH_MODULES_SUCC = "FETCH_MODULES_SUCC";
export const FETCH_REAL_TABLES_SUCC = "FETCH_REAL_TABLES_SUCC";
export const SAVE_MODULE_SUCC = "SAVE_MODULE_SUCC";

//请求接口的host部分
const ADDRESS = "http://localhost:9876"

function log(msg){
	if(window.console){
		console.log(msg)
		return 
	}
	console.log("window not have console")
}

/*// 取得项目
export function getProjects(projectName){
	return{
		type:NEW_PROJECT,
		projectName
	}
}*/





// 选择模板
export function selectTemplate(templateID){
	return{
		type:SELECT_TEMPLATE,
		templateID
	}
}

// 给定table，切换selectModule页右边的table展示
export function showTable(table){
	return{
		type:SHOW_TABLE,
		table
	}
}

// 切换备选Module的选中状态
export function toggleSelect(selectedParams){
	return{
		type:TOGGLE_SELECT,
		selectedParams //{moduleID,version,isSelected}
	}
}


/****************项目展示页  actions   start****************/

// 项目展示页，新建协议时选择项目
export function selectProj(projID,projName){
	return{
		type:SELECT_PROJ,
		projID,
		projName
	}
}

//异步请求项目列表
export const fetchProjs=()=>dispatch=>{
	/*return dispatch => {*/
    	//dispatch(requestProjs())
	return fetch(`${ADDRESS}/settings/getProjects`, {
        method: "GET",
	  	mode: "cors",
	 	headers: {
	    	"Content-Type": "application/x-www-form-urlencoded"
	  	}})
      	.then(response => {
	      	if(response.ok){
				//log("response ok")
				//log(response)
				return response.json()
			}
	      	throw new Error("resonse is not ok");
	    })
	    .then(json => {
	    	//log(json);
	    	dispatch(receiveProj(json));
		})
	    .catch(function(error) {
  			console.log('There has been a problem with your fetch operation: ' + error.message);
		});
}

// 异步请求项目列表成功
export function receiveProj(json){
	return {
		type:RECEIVE_PROJ,
		json
	}
}

// 开始发起请求
/*function projRequest(){
	return {
		type:PROJ_REQUEST
	}
}
*/

export const newProject = (projectName)=>dispatch=>{
	
	return fetch(`${ADDRESS}/settings/createProject`,{
		method: "POST",
	  	mode: "cors",
	 	headers: {
	    	"Content-Type": "application/x-www-form-urlencoded"
	  	},
	  	body: `projectName=${projectName}`
	})
	.then(response=>{
		/*console.log(response)*/
		if(response.ok){
			return response.text()
		}
		throw new Error("creating project resonse not ok")
	})
	.then(projectID => {
	    	dispatch(newProjSucc(projectID,projectName));
	})
	.catch(error=>{
		console.log('There has been a problem with your fetch operation: ' + error.message)
	})
}

// 上面异步请求成功了就dispatch本action
export function newProjSucc(projectID,projectName){
	return {
		type:NEW_PROJECT_SUCC,
		projectID,
		projectName
	}
}
/****************项目展示页  actions   end****************/



/****************模板选择页  actions   start****************/
export const fetchTemplates = ()=>dispatch=>{
	console.log("fetchTemplates")
	return fetch(`${ADDRESS}/settings/getTemplates`,{
		method: "GET",
	  	mode: "cors",
	 	headers: {
	    	"Content-Type": "application/x-www-form-urlencoded"
	  	},
	})
	.then(response=>{
		/*console.log(response)*/
		if(response.ok){
			return response.json()
		}
		throw new Error("creating project resonse not ok")
	})
	.then(json => {
	    //console.log(json);
	    dispatch(receiveTemplates(json));
	})
	.catch(error=>{
		console.log('There has been a problem with your fetch operation: ' + error.message)
	})
}

export function receiveTemplates(json){
	return{
		type:RECEIVE_TEMPLATES,
		json
	}
}

// 新建模板
/*export function newTemplate(templateTable){
	return{
		type:NEW_TEMPLATE,
		templateTable
	}
}*/

export const newTemplate = (templateTable)=>dispatch=>{
	console.log(templateTable)
	return fetch(`${ADDRESS}/settings/createTemplate`,{
		method: "POST",
	  	mode: "cors",
	 	headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'}, 
	 	body: JSON.stringify(templateTable)
	})
	.then(response=>{
		console.log(response)
		if(response.ok){
			//console.log(response)
			return response.json()
		}
		throw new Error("creating project resonse not ok")
	})
	.then(json => {
		console.log(json)
		if(json.success){
			dispatch(newTemplateSucc(json.templateID,templateTable));
		}else{
			throw new Error(json.errMsg);
		}
	})
	.catch(error=>{
		console.log('There has been a problem with your fetch operation: ' + error.message)
	})
}

export function newTemplateSucc(templateID,templateTable){
	return {
		type:NEW_TEMPLATE_SUCC,
		templateID,
		templateTable
	}
}

/****************模板选择页  actions   end****************/


/****************模块选择页  actions   start****************/
// 模块选择页面，获得模块列表
export const fetchModules = ()=>dispatch=>{

	return fetch(`${ADDRESS}/settings/getModuleList`,{
		method: "GET",
	  	mode: "cors",
	 	headers: { "Content-Type": "application/x-www-form-urlencoded"}, 
	})
	.then(response=>{
		console.log(response)
		if(response.ok){
			//console.log(response)

			return response.json()
		}
		throw new Error("creating resonse not ok")
	})
	.then(json => {
		console.log(json)
		dispatch(fetchModulesSucc(json))
	})
	.catch(error=>{
		console.log('There has been a problem with your fetch operation: ' + error.message)
	})
}

// 模块选择页面，异步请求模块列表成功
export function fetchModulesSucc(modules_tables){
	return{
		type:FETCH_MODULES_SUCC,
		modules_tables
	}
}

// 模块选择页面，获得realTables列表
export const fetchRealTables = ()=>dispatch=>{

	return fetch(`${ADDRESS}/settings/getRealTables`,{
		method: "GET",
	  	mode: "cors",
	 	headers: { "Content-Type": "application/x-www-form-urlencoded"}, 
	})
	.then(response=>{
		console.log(response)
		if(response.ok){
			//console.log(response)
			return response.json()
		}
		throw new Error("creating resonse not ok")
	})
	.then(json => {
		/*console.log(json)*/
		dispatch(fetchRealTablesSucc(json))
	})
	.catch(error=>{
		console.log('There has been a problem with your fetch operation: ' + error.message)
	})
}

// 模块选择页，异步请求realTables列表成功
export function fetchRealTablesSucc(realTables){
	return {
		type:FETCH_REAL_TABLES_SUCC,
		realTables
	}	
}

// 模块选择页，点击生成协议时，传递选择的模块到Store中
export function generateDoc(modules){
	return{
		type:GENERATE_DOC,
		modules
	}
}

// 模块选择页，确认完已选择模块后，把docs最后一项的isCompleted设为true
export function completeDoc(docID){
	return{
		type:COMPLETE_DOC,
		docID
	}
}

// 新建协议，异步请求
export const fetchCreateDoc = (createDocReq)=>dispatch=>{

	console.log(createDocReq)
	return fetch(`${ADDRESS}/settings/generateDoc`,{
		method: "POST",
	  	mode: "cors",
	 	headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'}, 
	 	body: JSON.stringify(createDocReq)
	})
	.then(response=>{
		console.log(response)
		if(response.ok){
			//console.log(response)

			return response.json()
		}
		throw new Error("creating project resonse not ok")
	})
	.then(json => {
		//console.log(json)
		if(json.success){
			console.log(json)
			/*dispatch(fetchCreateDocSucc())*/  // 改变isFetchCreateDocSucc的值为true   什么时候重置为false
			dispatch(generateDoc()) // 把选中的module写入state 
			dispatch(clearModules()) // 清除所有模块的选中状态
			dispatch(completeDoc(json.docID))  //把最后一个doc的isCompleted设为true,并加docID
			/*dispatch(closeDialog1())*/
			dispatch(showDialog2())  //把最后一个doc的isCompleted设为true,并加docID

			/*dispatch(newTemplateSucc(json.templateID,templateTable));*/
		}else{
			throw new Error(json.errMsg);
		}
	})
	.catch(error=>{
		console.log('There has been a problem with your fetch operation: ' + error.message)
	})
}
/*function fetchCreateDocSucc(){
	return{
		type:FETCH_CREATE_DOC_SUCC
	}
}*/
export function showDialog1(){
	return{
		type:SHOW_DIALOG1
	}
}
export function closeDialog1(){
	return{
		type:CLOSE_DIALOG1
	}
}
export function showDialog2(){
	return{
		type:SHOW_DIALOG2
	}
}
export function closeDialog2(){
	return{
		type:CLOSE_DIALOG2
	}
}

/****************模块选择页  actions   end****************/

// 模块选择页，确认已选择的模块时，清除所有模块的选中状态
export function clearModules(){
	return{
		type:CLEAR_MODULES
	}
}




// newModule页面，新增模块保存模块信息时
/*export function saveModule(moduleData){
	return{
		type:SAVE_MODULE,
		moduleData
	}
}*/

export const saveModule = (moduleData)=>dispatch=>{

	console.log(moduleData)
	return fetch(`${ADDRESS}/settings/createModule`,{
		method: "POST",
	  	mode: "cors",
	 	headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'}, 
	 	body: JSON.stringify(moduleData)
	})
	.then(response=>{
		console.log(response)
		if(response.ok){
			//console.log(response)

			return response.json()
		}
		throw new Error("creating project resonse not ok")
	})
	.then(json => {
		//console.log(json)
		if(json.success){
			/*console.log(json)*/
			dispatch(saveModuleSucc(json,moduleData))
		}else{
			throw new Error(json.errMsg);
		}
	})
	.catch(error=>{
		console.log('There has been a problem with your fetch operation: ' + error.message)
	})
}

//异步请求保存模块成功
export function saveModuleSucc(json,moduleData){
	return {
		type:SAVE_MODULE_SUCC,
		json,
		moduleData
	}
}
// TODO 到reducer中处理SAVE_MODULE_SUCC
/*
json格式：
	{
		success: true,
		moduleID: "fdasdf" / null,
		moduleVersion: "xadfdfa",
		tableName_ID: { “tableName1”: “tableID1”,  “tableName2”: “tableID2” }
	}
moduleData格式：
	{
		"newModuleName":"dsafdf",
	    "tables":[{
				tableTitle: "xx",
		        tableRows: tableRowsData
	    	}, {}, ...]
	}
*/


// 从已有模块复制，修改模块后保存模块，异步
/*export function saveCopiedModule(moduleData){
	return {
		type:SAVE_COPIED_MODULE,
		moduleData
	}
}*/

export const saveCopiedModule = (moduleData)=>dispatch=>{

	console.log(moduleData)
	return fetch(`${ADDRESS}/settings/saveModule`,{
		method: "POST",
	  	mode: "cors",
	  	
	 	headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'}, 
	 	body: JSON.stringify(moduleData)
	})
	.then(response=>{
		console.log(response)
		if(response.ok){
			//console.log(response)

			return response.json()
		}
		throw new Error("creating project resonse not ok")
	})
	.then(json => {
		//console.log(json)
		if(json.success){
			// console.log(json)
			dispatch(saveModuleSucc(json,moduleData))
		}else{
			throw new Error(json.errMsg);
		}
	})
	.catch(error=>{
		console.log('There has been a problem with your fetch operation: ' + error.message)
	})
}



/*// 新建文档
export function newDocument(projectName){
	return{
		type:NEW_PROJECT,
		projectName
	}
}

// 选择模块
export function selectModule(projectName){
	return{
		type:NEW_PROJECT,
		projectName
	}
}*/
