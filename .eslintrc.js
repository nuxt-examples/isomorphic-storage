module.exports = {
    root: true,
    env: {
        node: true
    },
    plugins: [
        'vue'
    ],
    extends: [
        'plugin:vue/strongly-recommended',
        'standard'
    ],
    rules: {
        'curly': ['off'],
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'semi': ['error', 'always'],
        'indent': ['warn', 4, {
            'SwitchCase': 1,
            'VariableDeclarator': 1,
            'outerIIFEBody': 1,
            'MemberExpression': 1,
            'FunctionDeclaration': { 'parameters': 1, 'body': 1 },
            'FunctionExpression': { 'parameters': 1, 'body': 1 },
            'CallExpression': { 'arguments': 1 },
            'ArrayExpression': 1,
            'ObjectExpression': 1,
            'ImportDeclaration': 1,
            'flatTernaryExpressions': false,
            'ignoreComments': false
        }],
        'no-multiple-empty-lines': ['error', {
            'max': 2,
            'maxEOF': 1,
            'maxBOF': 0
        }],
        'one-var': ['off'],
        'space-before-function-paren': ['error', {
            'anonymous': 'always',
            'named': 'never',
            'asyncArrow': 'always'
        }],

        'vue/html-self-closing': 'off',
        'vue/max-attributes-per-line': ['warn', {
            'singleline': 7,
            'multiline': {
                'max': 5,
                'allowFirstLine': false
            }
        }],
        'vue/html-indent': ['warn', 4, {
            'attribute': 1,
            'closeBracket': 0,
            'alignAttributesVertically': false,
            'ignores': []
        }],
        'vue/require-default-prop': 'off',
        'vue/require-prop-types': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/multiline-html-element-content-newline': 'off'
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};
