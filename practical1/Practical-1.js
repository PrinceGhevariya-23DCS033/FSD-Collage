const votes = {
            JavaScript: 0,
            Python: 0,
            Java: 0
        };

       
        function vote(language) {
            votes[language]++;
            updateVotes();
        }

      
        function updateVotes() {
            document.getElementById('js-votes').textContent = votes.JavaScript;
            document.getElementById('py-votes').textContent = votes.Python;
            document.getElementById('java-votes').textContent = votes.Java;
        }

        
        setInterval(() => {
            const langs = ['JavaScript', 'Python', 'Java'];
            const randomLang = langs[Math.floor(Math.random() * langs.length)];
            votes[randomLang]++;
            updateVotes();
        }, 2000);