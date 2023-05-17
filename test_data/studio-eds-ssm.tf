resource "aws_ssm_parameter" "auth0_backend_client_id" {
  count       = var.is_ephemeral ? 0 : 1
  name        = "/${local.app_env_name}/STUDIO_EDS_AUTH0_CLIENT_ID"
  description = "Studio EDS Auth0 Client ID"
  type        = "String"
  value       = auth0_client.backend[0].client_id
  tags        = module.tags.tags
}

resource "aws_ssm_parameter" "auth0_backend_client_secret" {
  count       = var.is_ephemeral ? 0 : 1
  name        = "/${local.app_env_name}/STUDIO_EDS_AUTH0_CLIENT_SECRET"
  description = "Studio EDS Auth0 Client Secret"
  type        = "String"
  value       = auth0_client.backend[0].client_secret
  tags        = module.tags.tags
}

data "aws_ssm_parameter" "studio_eds_organization_xapi_key" {
  name = "/${var.ssm_parameter_prefix_secure}/${var.app_name_prefix}/STUDIO_EDS_ORGANIZATION_XAPI_KEY"
}

data "aws_ssm_parameter" "platform_request_salesforce_private_key" {
  name = "/${var.ssm_parameter_prefix_secure}/platform-request-eds/PLATFORM_REQUEST_SALESFORCE_PRIVATE_KEY"
}

data "aws_ssm_parameter" "dd_api_key" {
  name = "/${var.ssm_parameter_prefix_secure}/global/DATADOG_API_KEY"
}

data "aws_ssm_parameter" "vpc_endpoint_id" {
  name = "/${var.ssm_parameter_prefix_secure}/platform-eds-gateway/VPC_ENDPOINT_ID"
}

data "aws_ssm_parameter" "studio_eds_eventbridge_arn" {
  name = "/${var.ssm_parameter_prefix_secure}/${var.app_name_prefix}/STUDIO_EDS_EVENTBRIDGE_ARN"
}

data "aws_ssm_parameter" "auth0_backend_client_id" {
  count      = var.is_ephemeral ? 1 : 0
  name       = "/${var.ssm_parameter_prefix_secure}/${var.app_name_prefix}/STUDIO_EDS_AUTH0_CLIENT_ID"
}

data "aws_ssm_parameter" "auth0_backend_client_secret" {
  count      = var.is_ephemeral ? 1 : 0
  name       = "/${var.ssm_parameter_prefix_secure}/${var.app_name_prefix}/STUDIO_EDS_AUTH0_CLIENT_SECRET"
}

data "aws_ssm_parameter" "platform_event_bridge_bus_arn" {
  name = "/${var.ssm_parameter_prefix_secure}/platform-account-eds/STUDIO_EDS_EVENTBRIDGE_ARN"
}

data "aws_ssm_parameter" "studioEventBridgeArn" {
  name = "/${var.ssm_parameter_prefix_secure}/${var.app_name_prefix}/STUDIO_EDS_EVENTBRIDGE_ARN"
}
