module.exports = {
    parser: "vue-eslint-parser",
    parserOptions: {
        ecmaVersion: "2017",
        sourceType: "module",
        parser: "typescript-eslint-parser"
    },
    plugins: [
        "typescript",
        "vue"
    ],
    rules: {
        /**
         * eslint 原生規則
         */
        "for-direction": "error", // 避免錯誤的 for 迴圈
        "eqeqeq": [ // 強制 ===
            "error",
            "always",
            {
                null: "ignore" // 忽略 "== null"
            }
        ],
        "no-mixed-spaces-and-tabs": "error", // 禁止 tab 和空格混用
        "semi": [ // 強制加分號
            "error",
            "always"
        ],
        // "quotes": [ // 字串強制使用單引號
        //     "error",
        //     "single"
        // ],
        "padding-line-between-statements": [ // 空行規則
            "warn",
            { blankLine: "always", prev: "*", next: "return" }, // return 前強制空一行
            { blankLine: "always", prev: ["const", "let", "var"], next: "*" }, // 所有變數聲明後面強制空一行
            { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
            { blankLine: "always", prev: "block-like", next: "*" } // 區塊結束後強制空一行
        ],
        "space-before-blocks": [ // 花括號前空格
            "error",
            "always"
        ],
        "require-jsdoc": [ // 要求一定要寫 js document
            "error",
            {
                "require": {
                    "FunctionDeclaration": true,
                    "MethodDefinition": true,
                    "ClassDeclaration": false, // 這條有問題，描述要寫在 decorator 下面才不會出錯，太醜
                    "ArrowFunctionExpression": true,
                    "FunctionExpression": true
                }
            }
        ],
        "valid-jsdoc": [ // 檢驗 js document 格式
            "error",
            {
                "requireReturnType": false, // 允許不寫 return 的型別
                "requireParamType": false, // 允許不寫參數的型別
                "requireReturn": false // 允許沒有下 return statment 的 method 不用寫 @returns
            }
        ],
        /**
         * typescript 擴充規則
         */
        "typescript/explicit-member-accessibility": "error", // 所有類別成員強制聲明存取權限
        "typescript/class-name-casing": "error", // class 與 interface 名稱強制大駝峰
        "typescript/interface-name-prefix": [ // interface 名稱前面強制加 "I"
            "warn",
            "always"
        ],
        "typescript/adjacent-overload-signatures": "error", // method 多載要群組化
        "typescript/type-annotation-spacing": [ // 類型聲明空格 e.g. "let a: string"
            "warn",
            { "before": false, "after": true }
        ],
        "typescript/member-ordering": [ // 類別成員排序
            "error",
            {
                "default": [
                    // field
                    "private-static-field",
                    "protected-static-field",
                    "public-static-field",
                    "private-instance-field",
                    "protected-instance-field",
                    "public-instance-field",
                    // constructor
                    "public-constructor",
                    "protected-constructor",
                    "private-constructor",
                    // method
                    "public-static-method",
                    "protected-static-method",
                    "private-static-method",
                    "public-instance-method",
                    "protected-instance-method",
                    "private-instance-method"
                ]
            }
        ],
        "typescript/no-array-constructor": "warn", // Array 的建構子強制使用泛型參數
        "typescript/no-use-before-define": "warn", // 禁止使用未定義之變數
    }
};