"use client";

import { IUserPrompt } from "@/utils/interfaces";
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

interface Props {
  data: IUserPrompt[];
  handleTagClick: (tag: string) => void;
}

const PromptCardList = ({ data, handleTagClick }: Props) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post, index) => (
        <PromptCard
          key={post._id || index}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState<IUserPrompt[]>([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<
    NodeJS.Timeout | undefined
  >(undefined);
  const [searchedResults, setSearchedResults] = useState<IUserPrompt[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setAllPosts(data);
    })();
  }, []);

  const filterPrompts = (searchtext: string) => {
    const regex = new RegExp(searchtext, "i");
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    const timeoutFunc = () => {
      return setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500);
    };
    setSearchTimeout(timeoutFunc);
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);
    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
        {searchText && (
          <button
            type="button"
            onClick={() => setSearchText("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-1 hover:bg-gray-300"
          >
            ❌
          </button>
        )}
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
