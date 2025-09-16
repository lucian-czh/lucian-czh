// 测试代码 - 测试 README 生成功能
const Mustache = require('mustache')
const fs = require('fs')
const path = require('path')

// 测试数据
const testData = {
  refresh_date: new Date().toLocaleDateString('zh', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
    timeZone: 'Asia/Shanghai',
  }),
}

// 测试函数
function testGenerateReadMe() {
  console.log('🧪 开始测试 README 生成功能...')

  try {
    // 1. 测试模板文件是否存在
    const templatePath = './main.mustache'
    if (!fs.existsSync(templatePath)) {
      throw new Error('模板文件 main.mustache 不存在')
    }
    console.log('✅ 模板文件存在')

    // 2. 测试模板内容读取
    const templateContent = fs.readFileSync(templatePath, 'utf8')
    if (!templateContent) {
      throw new Error('模板文件内容为空')
    }
    console.log('✅ 模板内容读取成功')

    // 3. 测试 Mustache 渲染
    const renderedContent = Mustache.render(templateContent, testData)
    if (!renderedContent) {
      throw new Error('模板渲染失败')
    }
    console.log('✅ 模板渲染成功')

    // 4. 测试数据格式
    if (!testData.refresh_date) {
      throw new Error('测试数据格式错误')
    }
    console.log('✅ 测试数据格式正确')
    console.log(`📅 当前时间: ${testData.refresh_date}`)

    // 5. 测试文件写入（写入测试文件而不是覆盖 README.md）
    const testOutputPath = './test-output.md'
    fs.writeFileSync(testOutputPath, renderedContent)
    console.log('✅ 测试文件写入成功')

    // 6. 验证输出文件
    const outputContent = fs.readFileSync(testOutputPath, 'utf8')
    if (!outputContent.includes(testData.refresh_date)) {
      throw new Error('输出文件内容验证失败')
    }
    console.log('✅ 输出文件内容验证成功')

    console.log('🎉 所有测试通过！')

    // 清理测试文件
    fs.unlinkSync(testOutputPath)
    console.log('🧹 测试文件已清理')
  } catch (error) {
    console.error('❌ 测试失败:', error.message)
    process.exit(1)
  }
}

// 运行测试
if (require.main === module) {
  testGenerateReadMe()
}

module.exports = { testGenerateReadMe, testData }
