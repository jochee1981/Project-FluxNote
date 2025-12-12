import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Navbar, NavbarBrand, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import NoteList from './NoteList';
import NoteEditor from './NoteEditor';
import SearchBar from './SearchBar';

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem(`fluxnote-notes-${currentUser?.id}`);
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // 사용자별로 노트를 localStorage에 저장
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`fluxnote-notes-${currentUser.id}`, JSON.stringify(notes));
    }
  }, [notes, currentUser]);

  // 새 노트 생성
  const handleCreateNote = () => {
    const newNote = {
      id: Date.now(),
      title: '',
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setIsEditing(true);
  };

  // 노트 선택
  const handleSelectNote = (note) => {
    setSelectedNote(note);
    setIsEditing(false);
  };

  // 노트 저장
  const handleSaveNote = (updatedNote) => {
    setNotes(notes.map(note => 
      note.id === updatedNote.id 
        ? { ...updatedNote, updatedAt: new Date().toISOString() }
        : note
    ));
    setSelectedNote(updatedNote);
    setIsEditing(false);
  };

  // 노트 삭제
  const handleDeleteNote = (noteId) => {
    if (window.confirm('이 노트를 삭제하시겠습니까?')) {
      setNotes(notes.filter(note => note.id !== noteId));
      if (selectedNote && selectedNote.id === noteId) {
        setSelectedNote(null);
        setIsEditing(false);
      }
    }
  };

  // 노트 검색 필터링
  const filteredNotes = notes.filter(note => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
    );
  });

  return (
    <div className="app">
      <Navbar bg="primary" variant="dark" className="app-header shadow">
        <Container fluid>
          <NavbarBrand className="d-flex align-items-center">
            <span className="me-2 fs-3">📝</span>
            <div>
              <h1 className="mb-0 fs-3">FluxNote</h1>
              <small className="opacity-75">반응형 메모 앱</small>
            </div>
          </NavbarBrand>
          <div className="ms-auto d-flex align-items-center flex-wrap">
            <span className="me-3 text-white d-none d-md-inline">
              안녕하세요, <strong>{currentUser?.name}</strong>님!
            </span>
            <Button variant="outline-light" onClick={logout} size="sm">
              로그아웃
            </Button>
          </div>
        </Container>
      </Navbar>
      
      <Container fluid className="app-container py-4">
        <Row className="g-3">
          <Col xs={12} md={4} lg={3}>
            <div className="sidebar h-100">
              <div className="sidebar-header mb-3">
                <button 
                  className="btn btn-primary w-100 mb-3 shadow-sm" 
                  onClick={handleCreateNote}
                >
                  <span className="me-2">+</span> 새 노트
                </button>
                <SearchBar 
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />
              </div>
              
              <NoteList
                notes={filteredNotes}
                selectedNote={selectedNote}
                onSelectNote={handleSelectNote}
                onDeleteNote={handleDeleteNote}
              />
            </div>
          </Col>

          <Col xs={12} md={8} lg={9}>
            <div className="main-content h-100">
              {selectedNote ? (
                <NoteEditor
                  note={selectedNote}
                  isEditing={isEditing}
                  onEdit={() => setIsEditing(true)}
                  onSave={handleSaveNote}
                  onCancel={() => setIsEditing(false)}
                />
              ) : (
                <div className="empty-state card shadow-sm h-100">
                  <div className="card-body d-flex flex-column align-items-center justify-content-center text-center p-5">
                    <h2 className="text-primary mb-3">노트를 선택하거나 새로 만들어보세요</h2>
                    <p className="text-muted">왼쪽에서 노트를 선택하거나 "새 노트" 버튼을 클릭하세요.</p>
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;

