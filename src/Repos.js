import React, {useEffect} from 'react';
import "./Repos.css";

function Repos({user}) {

  const [repos, setRepos] = React.useState(null);

  const[favlang, setfavlang] = React.useState("");


  const fetchRepos = async (user) => {
    const response = await fetch("https://api.github.com/users/" + user + "/repos");
    const res = await response.json();
    let frequencyLang = {}
    for(let repo of res) {
      frequencyLang[repo.language] = (frequencyLang[repo.language] || 0)+ 1;
    }

    let max = 0;
    let favoriteLang = null;

    for(let i in frequencyLang) {
        if(frequencyLang[i] > max) {
          max = frequencyLang[i];
          favoriteLang = i;
        }
    }

    setfavlang(favoriteLang);

    setRepos(res);
  }

  const colors = ["#FF9AA2", "#FFB7B2", "#C7CEEA"];


  useEffect( () => {

    fetchRepos(user);

  }, [user])

  return (
    <section className="repos">
    <h1>{user}'s Repos!</h1>
    <h3>Favorite Language: {favlang}</h3>
    { repos !== null &&
      <img src={repos[0]?.owner.avatar_url} alt="user profile pic"/>
    }
      { repos !== null &&
        repos?.map((rep,i) => {
          return (
            <div className="repoBox" style={{backgroundColor: colors[i%3]}}>
              <div className="titleWrap">
                <h1 className="repoName">{rep?.name}</h1>
                <p>{rep?.language}</p>
                <p>{rep?.stargazers_count}⭐'s</p>
              </div>
              <p>{rep?.description}</p>
              <a href={rep?.html_url} target="_blank">GitHub Link</a>
            </div>
          )
        })
      }
    </section>
  );
}

export default Repos;
