export default 
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