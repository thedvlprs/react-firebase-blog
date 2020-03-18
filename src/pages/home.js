import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getFirebase } from '../firebase'

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState([]);

  if (loading && !blogPosts.length) {
    getFirebase()
      .database()
      .ref('/posts')
      .orderByChild('date')
      .once('value')
      .then(snapshot => {
        let posts = [];
        const snapshotVal = snapshot.val();
        for (let slug in snapshotVal) {
          posts.push(snapshotVal[slug]);
        }

        const newestFirst = posts.reverse();
        setBlogPosts(newestFirst);
        setLoading(false);
      });
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>Blog posts</h1>
      <p>
        Welcome to the starter code! We're showing hard-coded data right now.
      </p>
      {blogPosts.map(blogPost => (
        <section key={blogPost.slug} className="card">
          <img src={blogPost.coverImage} alt={blogPost.coverImageAlt} />
          <div className="card-content">
            <h2>
              {blogPost.title} &mdash;{" "}
              <span style={{ color: "#5e5e5e" }}>{blogPost.datePretty}</span>
            </h2>
            <p
              dangerouslySetInnerHTML={{
                __html: `${blogPost.content.substring(0, 200)}...`
              }}
            ></p>
            <Link to={`/${blogPost.slug}`}>Continue reading...</Link>
          </div>
        </section>
      ))}
    </>
  );
};

export default Home;
