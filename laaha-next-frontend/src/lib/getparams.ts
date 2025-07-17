// Not getting used.

import { DrupalJsonApiParams } from "drupal-jsonapi-params"

export function getParams(resourceType: string, fieldMachineName?: string) {
  const apiParams = new DrupalJsonApiParams()

  if (resourceType === "menu_link_content--menu_link_content") {
    return apiParams
      .addInclude(["field_icon"])
      .addFields("menu_link_content--menu_link_content", [
        "title,url,parent,expanded,field_icon",
      ])
      .addFields("file--file", ["uri", "filename"])
  }

  if (resourceType === "block-basic") {
    return apiParams.addFields(fieldMachineName ? fieldMachineName : "", [
      "body",
    ])
  }

  if (resourceType === "user-guideline") {
    apiParams
      .addInclude([
        "field_content",
        "field_content.field_single_image",
        "field_content.field_single_image.field_media_image",
        "field_content.paragraph_type",
        "field_content.field_video",
        "field_content.field_card_full",
        "field_content.field_card_full.field_icon",
        "field_content.field_card_full.field_icon.thumbnail",
      ])
      .addFields("node--page", [
        "title",
        "uid",
        "path",
        "status",
        "field_content",
        "layout",
      ])
      .addFields("user--user", [])
      .addFields("paragraph--text_and_video", ["field_heading", "field_video"])
      .addFields("paragraph--text", ["field_long_description"])
      .addFields("media--external_video", ["field_media_oembed_video", "name"])
      .addFields("paragraph--heading_with_card", [
        "field_heading",
        "field_card_full",
      ])
      .addFields("paragraph--icon_with_title_and_descrition", [
        "field_title",
        "field_card_description",
        "field_icon",
      ])
      .addFields("media--image", ["thumbnail", "field_media_image"])
  }

  if (resourceType === "canned-response") {
    return apiParams
      .addFields("taxonomy_term--canned_response", [
        "field_response_forum_user",
        "field_type",
        "drupal_internal__tid",
      ])
      .addFilter("field_type", "approval")
  }

  if (resourceType === "reject-reasons") {
    return apiParams
      .addFields("taxonomy_term--canned_response", [
        "field_response_forum_user",
        "field_type",
        "drupal_internal__tid",
      ])
      .addFilter("field_type", "rejection")
  }

  if (resourceType === "unpublish-reasons") {
    return apiParams
      .addFields("taxonomy_term--canned_response", [
        "field_response_forum_user",
        "field_type",
        "drupal_internal__tid",
      ])
      .addFilter("field_type", "unpublish")
  }

  if (resourceType === "node--page") {
    apiParams
      .addInclude([
        "field_content",
        "field_content.field_single_image",
        "field_content.field_single_image.field_media_image",
        "field_content.paragraph_type",
      ])
      .addFields("node--page", [
        "title",
        "uid",
        "path",
        "status",
        "field_content",
        "layout",
        "layout_structure",
      ])
      .addFields("user--user", [])
      .addFields("paragraph--layout", ["behavior_settings"])
      .addFields("paragraph--wysiwyg_editor", [
        "behavior_settings",
        "field_description",
      ])
      .addFields("paragraph--faq", ["field_question", "field_answer"])
  }

  if (resourceType === "taxonomy_term--categories") {
    apiParams.addInclude([
      "field_icon",
      "field_sub_category_thumbnail",
      "parent.field_icon",
    ])
  }

  if (resourceType === "hero_banner_community") {
    apiParams
      .addInclude([
        "field_full_width_components",
        "field_components_one",
        "field_components_one.field_video_file",
        "field_components_one.field_icon",
      ])
      .addFields("block_content--hero_banner_one_column", [
        "field_components_one",
        "field_full_width_components",
      ])
      .addFields("paragraph--icon_with_label", ["field_icon", "field_title"])
      .addFields("paragraph--title", ["field_answer"])
      .addFields("paragraph--description", ["field_service_description"])
      .addFields("paragraph--video", ["field_video_file"])
      .addFields("paragraph--notice", ["field_icon", "field_answer"])
  }

  if (resourceType === "guideline-data") {
    apiParams
      .addInclude([
        "field_components",
        "field_components.field_card_full",
        "field_components.field_card_full.field_icon",
        "field_components.field_card_full.field_icon.field_media_image",
      ])
      .addFields("paragraph--heading_with_card", [
        "field_components",
        "field_heading",
        "field_card_full",
      ])
      .addFields("paragraph--icon_with_title_and_descrition", [
        "field_title",
        "field_card_description",
        "field_icon",
      ])
  }

  if (resourceType === "text_video") {
    apiParams.addInclude(["field_video", "field_video.field_media_video_file"])
  }
  return apiParams.getQueryObject()
}
