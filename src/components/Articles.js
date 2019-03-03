import React, { Component } from "react";
import "../App.css";
import { Link } from "@reach/router";
import * as api from "../api.js";
import SortBy from "./Sortby";

class Articles extends Component {
  state = {
    articles: []
  };
  render() {
    const { articles } = this.state;

    return (
      <div className="center">
        <SortBy sortedArticles={this.sortedArticles} />
        {articles.map(article => (
          <div key={article.article_id}>
            <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
          </div>
        ))}
      </div>
    );
  }
  componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topic !== this.props.topic) this.fetchArticles();
  }

  fetchArticles = () => {
    const { topic } = this.props;
    api
      .getArticles(topic)
      .then(articles => {
        this.setState({ articles });
      })
      .catch(err => err);
  };
  sortedArticles = articles => {
    this.setState({ articles });
  };
}

export default Articles;
