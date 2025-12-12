import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import './NoteList.css';

function NoteList({ notes, selectedNote, onSelectNote, onDeleteNote }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPreview = (content) => {
    if (!content) return '내용 없음';
    return content.length > 50 ? content.substring(0, 50) + '...' : content;
  };

  if (notes.length === 0) {
    return (
      <div className="note-list-empty text-center p-4">
        <p className="text-muted mb-2">노트가 없습니다.</p>
        <p className="text-muted small">새 노트를 만들어보세요!</p>
      </div>
    );
  }

  return (
    <div className="note-list">
      {notes.map(note => (
        <Card
          key={note.id}
          className={`note-item mb-2 shadow-sm ${selectedNote?.id === note.id ? 'border-primary border-2' : ''}`}
          onClick={() => onSelectNote(note)}
          style={{ cursor: 'pointer' }}
        >
          <Card.Body className="p-3">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <Card.Title className="mb-0 fs-6 fw-bold text-truncate me-2" style={{ flex: 1 }}>
                {note.title || '(제목 없음)'}
              </Card.Title>
              <button
                className="btn btn-sm btn-outline-danger p-0"
                style={{ width: '24px', height: '24px', lineHeight: '1', fontSize: '18px' }}
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteNote(note.id);
                }}
                aria-label="노트 삭제"
              >
                ×
              </button>
            </div>
            <Card.Text className="text-muted small mb-2" style={{ 
              minHeight: '40px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {getPreview(note.content)}
            </Card.Text>
            <Badge bg="secondary" className="small">
              {formatDate(note.updatedAt)}
            </Badge>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default NoteList;

