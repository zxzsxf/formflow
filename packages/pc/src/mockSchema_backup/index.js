export const mockSchema = {
    "schemaId": "12",
    "formTemplateId": "form-601101",
    "version": "323",
    "formTemplateSnapshotId": "104250",
    "schemas": {
        "type": "object",
        "properties": [
            {
                "name": "personInfo",
                "title": "",
                "type": "void",
                "properties": [
                    {
                        "name": "PersonNum",
                        "title": "用餐人员",
                        "required": false,
                        "readOnly": false,
                        "type": "object",
                        "x-index": 0,
                        "x-component": "Input",
                        "x-component-props": {
                            "title": "消费人数",
                            "innerAndOuterNumVisible": false,
                            "placeholder": "请输入",
                            "personNumRequired": true,
                            "showPersonAvg": "false",
                            "averageTitle": "人均消费",
                            "personNumVisible": true,
                            "required": true
                        },
                        "x-b-name": "PersonNum",
                        "x-config": {
                            "permission": {
                                "editable": true,
                                "selectable": true,
                                "deletable": true
                            },
                            "group": {
                                "code": "personInfo",
                                "name": "",
                                "order": 1,
                                "type": "void"
                            }
                        }
                    }
                ],
                "x-index": 0,
                "x-component": "Card",
                "x-component-props": {
                    "setErrForms": null,
                    "mainInstance": null,
                    "lxConfig": null
                },
                "x-config": {
                    "group": {
                        "code": "personInfo",
                        "name": "",
                        "order": 1,
                        "type": "void"
                    }
                },
                "x-decorator": "ItemDecorator",
                "x-decorator-props": {
                    "type": "IndepItem"
                }
            },
            {
                "name": "reportSwitch",
                "title": "消费信息",
                "type": "void",
                "properties": [
                    {
                        "name": "ReportSwitch",
                        "x-index": 0,
                        "x-component": "RatioGroup",
                        "x-component-props": {
                            "title": "稍后报备",
                            "subTitle": "稍后填写",
                            "checked": "false"
                        },
                        "x-b-name": "ReportSwitch",
                        "x-config": {
                            "permission": {
                                "editable": true,
                                "selectable": true,
                                "deletable": true
                            },
                            "group": {
                                "code": "reportSwitch",
                                "name": "消费信息",
                                "order": 3,
                                "type": "void"
                            }
                        }
                    }
                ],
                "x-index": 1,
                "x-component": "Card",
                "x-component-props": {
                    "setErrForms": null,
                    "mainInstance": null,
                    "lxConfig": null
                },
                "x-config": {
                    "group": {
                        "code": "reportSwitch",
                        "name": "消费信息",
                        "order": 3,
                        "type": "void"
                    }
                },
                "x-decorator": "ItemDecorator",
                "x-decorator-props": {
                    "type": "IndepItem"
                }
            },
            {
                "name": "reportInfo",
                "title": "消费信息",
                "type": "void",
                "properties": [
                    {
                        "name": "ConsumeDescription",
                        "title": "输入框组件",
                        "required": false,
                        "readOnly": false,
                        "type": "string",
                        "x-index": 0,
                        "x-component": "Input",
                        "x-component-props": {
                            "type": "textarea",
                            "title": "消费说明",
                            "placeholder": "请填写本次消费的说明",
                            "showLetter": true,
                            "maxLength": "50",
                            "required": "true",
                            "showHistoryList": true,
                            "storageKey": "recentReasonList",
                            "historyWriteList": [],
                            "defaultValue": ""
                        },
                        "x-b-name": "ConsumeDescription",
                        "x-config": {
                            "permission": {
                                "editable": true,
                                "selectable": true,
                                "deletable": true
                            },
                            "group": {
                                "code": "reportInfo",
                                "name": "消费信息",
                                "order": 4,
                                "type": "void"
                            }
                        }
                    },
                    {
                        "name": "UploadReceipt",
                        "x-index": 1,
                        "x-component": "Upload",
                        "x-component-props": {
                            "title": "用餐小票",
                            "required": true,
                            "openAI": true,
                            "openRecognizeForAI": true,
                            "recognizeFieldForAI": [
                                "shopName",
                                "personNum",
                                "consumeTime",
                                "amount",
                                "dishNames",
                                "receiptNumber"
                            ],
                            "recognizeFieldFailedAction": 3,
                            "checkPersonNum": {
                                "open": false,
                                "action": 1
                            },
                            "checkTime": {
                                "open": false,
                                "action": 1
                            },
                            "checkAmount": {
                                "open": false,
                                "action": 1
                            },
                            "checkProduct": {
                                "open": false,
                                "action": 1
                            },
                            "defaultValue": [],
                            "groupTag": "applyTicket",
                            "referId": "1944947078480359495",
                            "bizType": 2,
                            "accept": "image/*",
                            "shouldAppendExtensionToS3Link": true,
                            "formTemplateId": "123890",
                            "orderNo": "1944947078480359495",
                            "receiptAiSwitch": true,
                            "personNum": 10
                        },
                        "x-b-name": "UploadReceipt",
                        "x-config": {
                            "permission": {
                                "editable": true,
                                "selectable": true,
                                "deletable": true
                            },
                            "group": {
                                "code": "reportInfo",
                                "name": "消费信息",
                                "order": 4,
                                "type": "void"
                            }
                        }
                    }
                ],
                "x-index": 2,
                "x-component": "Card",
                "x-component-props": {
                    "setErrForms": null,
                    "mainInstance": null,
                    "lxConfig": null
                },
                "x-config": {
                    "group": {
                        "code": "reportInfo",
                        "name": "消费信息",
                        "order": 4,
                        "type": "void"
                    }
                },
                "x-decorator": "ItemDecorator",
                "x-decorator-props": {
                    "type": "IndepItem"
                }
            }
        ]
    }
}