import { useState, useEffect } from 'react';
import NotesList from '../components/componentsNote/NotesList';
import React from "react";
import Search from '../components/componentsNote/Search';
import Header from '../components/componentsNote/Header';
import '../assets/styles/NoteStyle.css';
import axios from 'axios';
export default function Notes () {
	const [notes, setNotes] = useState([]);
	const user=localStorage.getItem('user');
	const [searchText, setSearchText] = useState('');
	const [isLoaded,setIsLoaded]=useState(false);
	const [darkMode, setDarkMode] = useState(false);
    const savedNotes={}
	useEffect(() => {
		
		if(!isLoaded){
			fetch(`http://localhost:8000/notes/${user}`).then(response=>
			  response.json()
			  )
			.then(data=>{
			  setIsLoaded(true)
			setNotes(data)
			  })
			.catch(err=>{
			  console.log(err)
			})
		   
		  }
	}, []);


	const addNote = (text) => {

		fetch(`http://127.0.0.1:8000/notes`, {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify({
			"note_content":text,
			"user":user,
			}),
		  })
		window.location.reload(true)
	};

	const deleteNote = (id) => {
		axios.delete(`http://127.0.0.1:8000/notes/${id}`)
		window.location.reload(true)
	};

	return (
		<div className='yellocard'>
		<div className={`${darkMode && 'dark-mode'}`}>
			<div className='containerNote'>
				<Header handleToggleDarkMode={setDarkMode} />
				<Search handleSearchNote={setSearchText} />
				<NotesList
					notes={notes.filter((note) =>
						note.note_content.toLowerCase().includes(searchText)
					)}
					handleAddNote={addNote}
					handleDeleteNote={deleteNote}
				/>
			</div>
		
		</div>
		</div>
	);
};


