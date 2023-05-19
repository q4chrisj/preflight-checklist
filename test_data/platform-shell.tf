data "aws_ssm_parameter" "datadog_api_key" {
  name = local.is_feature ? "/dev/global/DATADOG_API_KEY" : "/${var.environment}/global/DATADOG_API_KEY"
}

resource "aws_ssm_parameter" "platform_shell_cf_distribution_id" {
  name        = "/${local.ssm_parameter_prefix}/CLOUDFRONT_DISTRIBUTION_ID"
  description = "Platform Shell CloudFront Distribution ID"
  type        = "String"
  value       = aws_cloudfront_distribution.platform_shell.id
  tags        =  module.tags.tags
}

resource "aws_ssm_parameter" "auth0_client_id" {
  count       = var.is_ephemeral ? 0 : 1
  name        = "/${local.ssm_parameter_prefix}/AUTH0_CLIENT_ID"
  description = "Auth0 Client ID"
  type        = "String"
  value       = auth0_client.q4_platform[0].client_id
  tags        = module.tags.tags
  overwrite   = true
}

resource "aws_ssm_parameter" "auth0_audience" {
  name        = "/${local.ssm_parameter_prefix}/AUTH0_AUDIENCE"
  description = "Auth0 Audience"
  type        = "String"
  value       = "${var.auth0_audience_prefix}.api"
  tags        =  module.tags.tags
  overwrite   = true
}

resource "aws_ssm_parameter" "auth0_domain" {
  name        = "/${local.ssm_parameter_prefix}/AUTH0_DOMAIN"
  description = "Auth0 Domain"
  type        = "String"
  value       = var.auth0_domain
  tags        =  module.tags.tags
  overwrite   = true
}

resource "aws_ssm_parameter" "auth0_role_audience" {
  name        = "/${local.ssm_parameter_prefix}/AUTH0_ROLE_AUDIENCE"
  description = "Auth0 Role/Graph Audience"
  type        = "String"
  value       = "${var.auth0_audience_prefix}.q4graph"
  tags        =  module.tags.tags
  overwrite   = true
}

resource "aws_ssm_parameter" "help_center_url" {
  name        = "/${local.ssm_parameter_prefix}/HELP_CENTER_URL"
  description = "Paligo Help Center URL"
  type        = "String"
  value       = var.help_center_url
  tags        =  module.tags.tags
  overwrite   = true
}

resource "aws_ssm_parameter" "platform_shell_hosted_zone" {
  name        = "/${local.ssm_parameter_prefix}/PLATFORM_SHELL_HOSTED_ZONE"
  description = "Platform Shell Hosted Zone"
  type        = "String"
  value       = var.hosted_zone
  tags        =  module.tags.tags
  overwrite   = true
}

resource "aws_ssm_parameter" "launchdarkly_api_key" {
  name        = "/${local.ssm_parameter_prefix}/LAUNCHDARKLY_API_KEY"
  description = "LaunchDarkly API Key"
  type        = "String"
  value       = var.launchdarkly_api_key
  tags        = module.tags.tags
  overwrite   = true
}
