export const initState = {
	"projects":[
		{"projectID":"11","projectName":"项目名AA",
		 "docs":["文档名IDaa1","文档名IDaa2"],
		},
		{"projectID":"12","projectName":"项目名BB",
		 "docs":["文档名IDaa1","文档名IDaa2"],
		},
	],
	"templates":[
		{
			"templateID":"11",
			"rows":[
				{"rowID":"r11", "rowKey":"key11", "myType":"String", "reference":"xx", "note":"xxx"},
				{"rowID":"r12", "rowKey":"key12", "myType":"String", "reference":"xx", "note":"xxx"},
			]
		},
		{
			"templateID":"12",
			"rows":[
				{"rowID":"r11", "rowKey":"key11", "myType":"String", "reference":"xx", "note":"xxx"},
				{"rowID":"r12", "rowKey":"key12", "myType":"String", "reference":"xx", "note":"xxx"},
			]
		},
		{
			"templateID":"13",
			"rows":[
				{"rowID":"r11", "rowKey":"key11", "myType":"String", "reference":"xx", "note":"xxx"},
				{"rowID":"r12", "rowKey":"key12", "myType":"String", "reference":"xx", "note":"xxx"},
			]
		},
	],
	"modules":[
		{"moduleName":"xxx1", "versions":["version1","version2"], "tables":["tableA_ID1","tableB_ID2"]},
		{"moduleName":"xxx2", "versions":["version1","version2"], "tables":["tableA_ID1","tableB_ID2"]},
		{"moduleName":"xxx3", "versions":["version1","version2"], "tables":["tableA_ID1","tableB_ID2"]},
	],
	"tables":[
		{
			"tableID":"1",
			"tableName":"aa",
			"moduleID":"m1",
			"version":"v11",
			"rows":[
				{rowName:"rowAA", rowType:"String", reference:"sss", note: "xxxsd"},
				{rowName:"rowBB", rowType:"String", reference:"sss", note: "xxxsd"},
				{rowName:"rowCC", rowType:"String", reference:"sss", note: "xxxsd"},
		 	]
		}
	]

}
