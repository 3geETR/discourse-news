import { service } from "@ember/service";
import { ajax } from "discourse/lib/ajax";
import { popupAjaxError } from "discourse/lib/ajax-error";
import buildTopicRoute from "discourse/routes/build-topic-route";

export default class NewsRoute extends buildTopicRoute("news") {
  @service siteSettings;
  @service site;
  @service store;

  async model(data, transition) {
    let newsModel;
    if (this.siteSettings.discourse_news_source === "rss") {
      newsModel = await ajax("/news")
        .then((result) => ({
          filter: "",
          topics: result.map((t) => ({
            title: t.title,
            description: t.description,
            url: t.url,
            image_url: t.image_url,
            rss: true,
          })),
        }))
        .catch(popupAjaxError);
    } else {
      newsModel = await super.model(data, transition);
    }

    if (this.siteSettings.discourse_news_sidebar_topic_list) {
      const filter =
        this.siteSettings.discourse_news_sidebar_topic_list_filter || "latest";
      try {
        const list = await this.store.findFiltered("topicList", { filter });
        const limit =
          this.siteSettings.discourse_news_sidebar_topic_list_limit || 10;
        newsModel.sidebarTopics = list.topics.slice(0, limit);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Error fetching sidebar topics:", e);
      }
    }

    return newsModel;
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    if (model.sidebarTopics) {
      controller.sidebarTopics = model.sidebarTopics;
    }
  }
}
