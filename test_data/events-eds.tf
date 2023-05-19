data "aws_ssm_parameter" "dd_api_key" {
  name = "/${var.ssm_parameter_prefix_secure}/global/DATADOG_API_KEY"
}

data "aws_ssm_parameter" "vpc_endpoint_id" {
  name = "/${var.ssm_parameter_prefix_secure}/platform-eds-gateway/VPC_ENDPOINT_ID"
}

data "aws_ssm_parameter" "events_eds_eventbridge_arn" {
  name = "/${var.ssm_parameter_prefix_secure}/global/EP_EDS_EVENT_BUS_ARN"
}




data "aws_ssm_parameter" "EE_CC_ORGANIZATION_SYNC" {
  name = "/${var.ssm_parameter_prefix_secure}/events-platform-api/EP_CC_ORGANIZATION_SYNC"
}

data "aws_ssm_parameter" "EE_CC_ORGANIZATION_SYNC_TOPIC" {
  name = "/${var.ssm_parameter_prefix_secure}/events-platform-api/EP_CC_ORGANIZATION_SYNC_TOPIC"
}
