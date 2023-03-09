import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createArticle } from "../../ulities/callApi";
import InputAbout from "./InputAbout";
import InputContent from "./InputContent";
import InputTag from "./InputTag";
import InputTitle from "./InputTitle";
import Tag from "./Tag";

const NewArticle = () => {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [content, setContent] = useState("");
  const [inputTag, setInputTag] = useState("");
  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

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

  const handleDeleteTag = (tag) => {
    const newTags = [...tags];
    const index = newTags.findIndex((tagItem) => tagItem === tag);
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const handleAddTag = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (tags && tags.slice(-1).toString() !== inputTag && inputTag !== "")
          setTags([...tags, inputTag]);
        setInputTag("");
      }
    },
    [inputTag, tags]
  );

  const handleSubmitArticle = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      setErrors("title can't be blank");
    } else if (about.trim() === "") {
      setErrors("description can't be blank");
    } else if (content === "") {
      setErrors("body can't be blank");
    } else {
      const newArticle = {
        title: title,
        description: about,
        body: content,
        tagList: tags,
      };
      createArticle({
        article: newArticle,
      })
        .then((data) => {
          const slug = data.article.slug;
          navigate(`/article/${slug}`);
          setTitle("");
          setAbout("");
          setContent("");
          setInputTag("");
          setTags(null);
          setErrors(null);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ul className="error-messages">{errors && <li>{errors}</li>}</ul>
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
                      tags.map((tag, index) => (
                        <Tag
                          tag={tag}
                          key={index}
                          position={index}
                          handleDeleteTag={handleDeleteTag}
                        />
                      ))}
                  </div>
                </fieldset>
                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  onClick={handleSubmitArticle}
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

export default NewArticle;
