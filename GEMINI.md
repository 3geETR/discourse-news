# GEMINI.md - discourse-news Plugin

## Project Overview

The **discourse-news** plugin adds a dedicated "News" route (`/news`) to a Discourse forum. It displays the latest topics from specific categories or an external RSS feed in a visually distinct, news-like format.

### Main Technologies
- **Backend:** Ruby on Rails (Discourse Plugin API).
- **Frontend:** Ember.js, Gjs (Glimmer components), Handlebars (`.hbs`).
- **Styling:** SCSS (following Discourse's `common` and `mobile` structure).
- **Data:** RSS support via `RSS` library; standard Discourse topic lists for category sources.

### Architecture
- **`plugin.rb`**: The main entry point where assets are registered, classes are patched (e.g., `ListController`, `TopicQuery`), and site settings are enabled.
- **`assets/javascripts/discourse/`**:
  - **`initializers/news-initializer.js`**: Registers the header button and the sidebar navigation link.
  - **`components/`**: UI logic using modern Gjs components (e.g., `NewsHeaderButton`, `NewsItem`).
  - **`routes/news.js`**: Handles data fetching for the news page, including optional sidebar topics.
  - **`templates/news.hbs`**: Defines the layout for the news stream and sidebar.
- **`lib/news/`**: Contains core logic for RSS integration (`rss.rb`) and custom topic lists (`rss_topic_list.rb`).
- **`config/settings.yml`**: Defines the plugin's configuration options (source, categories, RSS URL, sidebar visibility, etc.).

---

## Building and Running

This is a **Discourse Plugin**. It must be installed within a functioning Discourse environment to run.

### Setup
1. Clone the repository into the `plugins/` directory of your Discourse installation:
   ```bash
   git clone https://github.com/paviliondev/discourse-news.git plugins/discourse-news
   ```
2. Restart your Discourse server.
3. Enable the `discourse_news_enabled` site setting.

### Testing
To run the plugin's test suite:
```bash
# From the Discourse root directory
bundle exec rspec plugins/discourse-news
```

### Linting
To check code style (Ruby):
```bash
bundle exec rubocop plugins/discourse-news
```

---

## Development Conventions

### Coding Style
- **Ruby:** Follows the [Discourse Ruby Style Guide](https://github.com/discourse/rubocop-discourse).
- **JavaScript:** Uses modern Discourse conventions, including Gjs components and Ember's latest patterns.
- **CSS:** Uses SCSS variables and follows Discourse's `common` vs `mobile` split for responsive design.

### Testing Practices
- **System Specs:** Comprehensive system tests are located in `spec/system/news_spec.rb` to verify UI behavior and routing.
- **Library Specs:** Unit tests for backend logic are in `spec/lib/news/`.

### UI/Layout
- **Sidebar:** The news page uses a flexbox layout. The sidebar is conditionally rendered on PC (`!mobileView`) and is nested within the `#list-area` container to maintain consistent styling with Discourse's discovery lists.
- **Navigation:** The plugin integrates with the standard Discourse header and the newer global sidebar (v3.0+).
