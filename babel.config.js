module.exports = {
    presets: [["@vue/app", {useBuiltIns: "entry"}]],
    plugins: [
        '@babel/plugin-proposal-optional-chaining',// 可选链
        '@babel/plugin-proposal-nullish-coalescing-operator',// 双问号
    ],
    compact: false
}
