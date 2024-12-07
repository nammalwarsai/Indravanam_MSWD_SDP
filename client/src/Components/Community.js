import React, { useState } from "react";
import { useTheme } from "./ThemeContext"; // Reuse the context from the Weather component

const Community = () => {
  const [posts, setPosts] = useState([]); // Store all posts
  const [title, setTitle] = useState(""); // Input for title
  const [description, setDescription] = useState(""); // Input for description
  const [images, setImages] = useState([]); // Store uploaded images
  const [previewImages, setPreviewImages] = useState([]); // Store image previews

  const { theme, toggleTheme } = useTheme(); // Access theme and toggle function

  // Handle image uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...previews]);
  };

  // Handle post submission
  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;

    const newPost = {
      id: Date.now(),
      title,
      description,
      images: previewImages,
    };

    setPosts([newPost, ...posts]); // Add new post to the list
    setTitle(""); // Reset title
    setDescription(""); // Reset description
    setImages([]); // Reset images
    setPreviewImages([]); // Reset previews
  };

  // Handle post deletion
  const handleDeletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-all ${
        theme === "light"
          ? "bg-gradient-to-r from-green-200 to-blue-100 text-black"
          : "bg-gradient-to-r from-blue-900 to-gray-800 text-white"
      } p-4`}
    >
     
      <div
        className={`max-w-4xl w-full p-6 rounded-lg shadow-lg transition-all ${
          theme === "light" ? "bg-white" : "bg-gray-800"
        }`}
      >
        <h1 className="text-3xl font-bold text-center mb-6">Community Forum</h1>

        {/* Form for creating a new post */}
        <form onSubmit={handlePostSubmit} className="mb-8">
          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className={`w-full p-2 border rounded-md ${
                theme === "light"
                  ? "border-gray-300 bg-gray-100"
                  : "border-gray-700 bg-gray-900"
              }`}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Share your gardening experience"
              className={`w-full p-2 border rounded-md ${
                theme === "light"
                  ? "border-gray-300 bg-gray-100"
                  : "border-gray-700 bg-gray-900"
              }`}
              rows="4"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="images">
              Upload Photos
            </label>
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className={`block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold ${
                theme === "light"
                  ? "file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  : "file:bg-gray-700 file:text-white hover:file:bg-gray-600"
              }`}
            />
          </div>

          {/* Image previews */}
          {previewImages.length > 0 && (
            <div className="flex flex-wrap gap-4 mb-4">
              {previewImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-md shadow-md"
                />
              ))}
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-2 rounded-lg ${
              theme === "light"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            Share Experience
          </button>
        </form>

        {/* Dynamic Posts Section */}
        <h2 className="text-2xl font-bold text-center mb-4">Community Posts</h2>
        {posts.length === 0 ? (
          <p className="text-center text-gray-600">
            No posts yet. Be the first to share!
          </p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className={`p-4 rounded-lg shadow-md transition-all ${
                  theme === "light" ? "bg-gray-100" : "bg-gray-700 text-white"
                }`}
              >
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="text-gray-700">{post.description}</p>
                <div className="flex flex-wrap gap-4 mt-4">
                  {post.images.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt="Uploaded"
                      className="w-32 h-32 object-cover rounded-md shadow-md"
                    />
                  ))}
                </div>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete Post
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
