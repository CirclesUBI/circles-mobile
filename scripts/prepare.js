var prompt = require('prompt')
var fs = require('fs')

const envCi = require('env-ci')
const { isCi } = envCi()

if (isCi) {
  console.log('Installing:CI')
  console.log('Use default aws-exports.js')
} else {
  console.log('Installing:local')
  prompt.start()
  console.log('Enter AWS credentials:')
  //
  // Get two properties from the user: username and email
  //
  prompt.get([
    'aws_cognito_identity_pool_id',
    'aws_content_delivery_bucket',
    'aws_content_delivery_cloudfront_domain',
    'aws_mobile_analytics_app_id',
    'aws_project_id',
    'aws_resource_name_prefix'
  ], function (err, result) {
    if (err) {
      console.error(err)
      console.log('aborting prepare script...')
      return
    }
    console.log('AWS Credentials:')
    console.log('  aws_cognito_identity_pool_id: ' + result.aws_cognito_identity_pool_id)
    console.log('  aws_content_delivery_bucket: ' + result.aws_content_delivery_bucket)
    console.log('  aws_cognito_identity_pool_id: ' + result.aws_content_delivery_cloudfront_domain)
    console.log('  aws_content_delivery_bucket: ' + result.aws_mobile_analytics_app_id)
    console.log('  aws_cognito_identity_pool_id: ' + result.aws_project_id)
    console.log('  aws_content_delivery_bucket: ' + result.aws_resource_name_prefix)

    fs.writeFile('./src/aws_exports_computed.js', "// AWS Mobile Hub Project Constants\nconst awsmobile = {\n  'aws_app_analytics': 'enable',\n  'aws_cognito_identity_pool_id': '" +
      result.aws_cognito_identity_pool_id + "',\n  'aws_cognito_region': 'eu-central-1',\n  'aws_content_delivery': 'enable',\n  'aws_content_delivery_bucket': '" +
      result.aws_content_delivery_bucket + "',\n  'aws_content_delivery_bucket_region': 'eu-central-1',\n  'aws_content_delivery_cloudfront': 'enable',\n  'aws_content_delivery_cloudfront_domain': '" +
      result.aws_content_delivery_cloudfront_domain + "',\n  'aws_mobile_analytics_app_id': '" +
      result.aws_mobile_analytics_app_id + "',\n  'aws_mobile_analytics_app_region': 'us-east-1',\n  'aws_project_id': '" +
      result.aws_project_id + "',\n  'aws_project_name': 'circles-mobile',\n  'aws_project_region': 'eu-central-1',\n  'aws_resource_name_prefix': '" +
      result.aws_resource_name_prefix + "'\n}\n\nexport default awsmobile\n",
    function (err) {
      if (err) {
        return console.error(err)
      }
      console.log('The file was saved!')
    })
  })
}
