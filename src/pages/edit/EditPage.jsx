import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchDetail, updateArticle } from "../../ulities/callApi";
import InputAbout from "../article/InputAbout";
import InputContent from "../article/InputContent";
import InputTag from "../article/InputTag";
import InputTitle from "../article/InputTitle";
import Tag from "../article/Tag";

const EditPage = () => {
  const [dataArticle, setDataArticle] = useState({});
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [content, setContent] = useState("");
  const [inputTag, setInputTag] = useState("");
  const [tags, setTags] = useState([]);
  const location = useLocation();
  const slug = location.pathname.slice(8);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDetail(slug)
      .then((data) => {
        setDataArticle(data.article);
        setTitle(data.article.title);
        setAbout(data.article.description);
        setContent(data.article.body);
        setTags(data.article.tagList);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInputTitle = useCallback(
    (e) => {
      setTitle(e.target.value);
    },
    [title]
  );

  const handleInputAbout = useCallback(
    (e) => {
      setAbout(e.target.value);
    },
    [about]
  );

  const handleInputContent = useCallback(
    (e) => {
      setContent(e.target.value);
    },
    [content]
  );

  const handleAddTag = useCallback(
    (e) => {
      e.stopPropagation();
      if (e.key === "Enter") {
        if (tags && tags.slice(-1).toString() !== inputTag && inputTag !== "")
          setTags([...tags, inputTag]);
      }
    },
    [tags]
  );

  const handleUpdateArticle = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      setTitle(dataArticle.title);
    } else if (about.trim() === "") {
      setAbout(dataArticle.description);
    } else if (content === "") {
      setContent(dataArticle.body);
    } else if (
      title !== dataArticle.title ||
      about !== dataArticle.description ||
      content !== dataArticle.body
    ) {
      const newArticle = {
        title: title,
        description: about,
        body: content,
      };
      console.log("enable update");
      console.log(newArticle);
      updateArticle(slug, {
        article: newArticle,
      })
        .then((data) => {
          const slug = data.article.slug;
          console.log(slug);
          navigate(`/article/${slug}`);
          setTitle("");
          setAbout("");
          setContent("");
          setInputTag("");
          setTags(null);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("not update");
    }
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form>
              <fieldset>
                {/* Title Article */}
                <InputTitle title={title} handleInputTitle={handleInputTitle} />

                {/* About article */}
                <InputAbout about={about} handleInputAbout={handleInputAbout} />

                {/* Content */}
                <InputContent
                  content={content}
                  handleInputContent={handleInputContent}
                />
                {/* Tags */}
                <fieldset className="form-group">
                  <InputTag
                    inputTag={inputTag}
                    setInputTag={setInputTag}
                    handleAddTag={handleAddTag}
                  />
                  <div className="tag-list">
                    {tags &&
                      tags.length !== 0 &&
                      tags.map((tag, index) => <Tag tag={tag} key={index} />)}
                  </div>
                </fieldset>
                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  onClick={handleUpdateArticle}
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
