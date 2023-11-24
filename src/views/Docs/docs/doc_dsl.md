# DSL--SuperAST

## 简介
抽象语法树（AST）是一种形式语言编写的文本的抽象语法结构的树状表示，树上的每个节点都表示文本中出现的一个结构，其本质是将源代码映射为一棵结构树。在我们系统的设计过程中，我们系统基于AST设计了一套规则解析模版以及一棵能够满足系统规则制定的AST树，不仅用于将用户对规则模版的制作收集成为更易于管理的数据结构（AST树），还能够高效地渲染复杂的源码表示形式到用户的界面。

基于我们设计的AST语法树和解析模版，能够让规则模版的解析速度更快。常规AST树非常的复杂，单对一个声明语句，其AST树深度达就到了四层，若是一个复杂嵌套的源码结构转化出来的AST树，其深度将会呈指数级递增，而其渲染速度也会曾指数级递减。对于我们规则决策系统，并不需要如此复杂冗余的AST树。对此，我们进行了“Tree-Shaking操作”，只保留AST树语法节点源码信息。对于同一段条件规则语句，传统AST树与我们系统设计的AST树的复杂度差异十分明显。

<img src="./src/views/Docs/docs/图片1.png">


## 设计

### if模版渲染
```js
[
    {
        type: "if",
        conditions: [
            
        ],
        body: [

        ]
    },
    {
        type: "else if",
        conditions: [],
        body: []
    },
    {
        type: "else",
        body: []
    }
]
```


### while模版渲染
``` js
{
    type: "while",
    conditions: [],
    body: []
}
```


### 反诈事模版
``` js
[
    {
        type: "if",
        conditions: [
            {
                left: {
                    varName: 'time',
                    libId: 1
                },
                operator: ">=",
                right: {
                    varName: '今日 22:00',
                    libId: 1
                }
            },
            {
                left: {},
                operator: "&&",
                right: {}
            },
            {
                left: {
                    varName: 'time',
                    libId: 1
                },
                operator: "<",
                right: {
                    varName: '次日 05:00',
                    libId: 1
                }
            }
        ],
        body: [
            {
                type: 'print',
                received: {
                    libId: 1,
                    varName: '"可疑账户"'
                },
                calculate: {
                    left: {},
                    operator: "",
                    right: {}
                }
            }
        ]
    }
]
```
