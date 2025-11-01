const GITHUB_USER = 'saleem-shaik-git';
const PER_PAGE = 100; // adjust if you want fewer


async function fetchRepos(page = 1, acc = []){
const url = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=${PER_PAGE}&page=${page}&sort=updated`;
const res = await fetch(url);
if(!res.ok) throw new Error('GitHub API error: ' + res.status);
const data = await res.json();
if(data.length === 0) return acc;
return fetchRepos(page + 1, acc.concat(data));
}


function renderRepos(repos){
const container = document.getElementById('repo-list');
container.innerHTML = '';
// Filter and show featured repos first (optional)
const featured = ['user-service-springboot','order-management-api','inventory-microservice','api-gateway-springcloud'];
// sort: featured, then by updated
repos.sort((a,b)=> new Date(b.updated_at)-new Date(a.updated_at));
const sorted = repos.sort((a,b)=> (featured.includes(b.name)?1:0) - (featured.includes(a.name)?1:0));


sorted.forEach(r=>{
const d = document.createElement('div');
d.className = 'repo';
d.innerHTML = `
<div style="display:flex;justify-content:space-between;align-items:center">
<h3><a href="${r.html_url}" target="_blank">${r.name}</a></h3>
<div class="stargazers">⭐ ${r.stargazers_count}</div>
</div>
<p>${r.description || ''}</p>
<div class="meta">
<div>${r.language || ''}</div>
<div>${r.forks_count} forks</div>
<div>Updated ${new Date(r.updated_at).toLocaleDateString()}</div>
</div>
`;
container.appendChild(d);
})
}


(async function(){
try{
const repos = await fetchRepos();
renderRepos(repos.slice(0, 24)); // show top 24
}catch(e){
document.getElementById('repo-list').textContent = 'Could not load repositories. API rate limit may have been reached.';
console.error(e);
}
})();