import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('fluxnote-current-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 현재 사용자 정보를 localStorage에 저장
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('fluxnote-current-user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('fluxnote-current-user');
    }
  }, [currentUser]);

  // 회원가입
  const signup = (email, password, name) => {
    // 기존 사용자 목록 가져오기
    const users = JSON.parse(localStorage.getItem('fluxnote-users') || '[]');
    
    // 이메일 중복 확인
    if (users.find(user => user.email === email)) {
      throw new Error('이미 사용 중인 이메일입니다.');
    }

    // 새 사용자 생성
    const newUser = {
      id: Date.now(),
      email,
      password, // 실제 프로덕션에서는 해시화 필요
      name,
      createdAt: new Date().toISOString()
    };

    // 사용자 목록에 추가
    users.push(newUser);
    localStorage.setItem('fluxnote-users', JSON.stringify(users));

    // 로그인 상태로 설정
    setCurrentUser({ id: newUser.id, email: newUser.email, name: newUser.name });
    
    return newUser;
  };

  // 로그인
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('fluxnote-users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    setCurrentUser({ id: user.id, email: user.email, name: user.name });
    return user;
  };

  // 로그아웃
  const logout = () => {
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

