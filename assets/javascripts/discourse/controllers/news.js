import DiscoveryListController from "discourse/controllers/discovery/list";
import { service } from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class NewsController extends DiscoveryListController {
  @service site;
  @service siteSettings;

  @tracked sidebarTopics = null;

  get showSidebar() {
    return this.showSidebarTopics;
  }

  get showSidebarTopics() {
    return (
      this.sidebarTopics?.length > 0 &&
      this.siteSettings.discourse_news_sidebar_topic_list
    );
  }
}
