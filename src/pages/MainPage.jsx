import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MainPage.css";
import axios from "axios";

// ✅ 환경변수
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function MainPage() {
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);

                const response = await axios.get(
                    `${API_BASE_URL}/api/books`
                );

                setItems(response.data);
            } catch (err) {
                console.error("❌ API 호출 실패:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) return <div>로딩중...</div>;
    if (error) return <div>오류가 발생했습니다.</div>;

    const itemsPerPage = 3;
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const indexLast = currentPage * itemsPerPage;
    const indexFirst = indexLast - itemsPerPage;
    const currentItems = items.slice(indexFirst, indexLast);

    return (
        <div className="container">
            <div className="banner">
                <h2>페이지 배너</h2>
                <button
                    className="register-btn"
                    onClick={() => navigate("/register")}
                >
                    등록
                </button>
            </div>

            <div className="card-row">
                {currentItems.length === 0 ? (
                    <div className="card">
                        <div>등록된 작품이 없습니다.</div>
                        <button
                            className="register-btn"
                            onClick={() => navigate("/register")}
                        >
                            작품 등록하기
                        </button>
                    </div>
                ) : (
                    currentItems.map((item) => (
                        <div
                            key={item.id || item.bookId}
                            className="card"
                            onClick={() =>
                                navigate(`/detail/${item.id || item.bookId}`)
                            }
                            style={{ cursor: "pointer" }}
                        >
                            <img
                                src={item.img || item.coverImageUrl}
                                alt="이미지"
                                className="card-img"
                            />
                            <div className="title">{item.title}</div>
                        </div>
                    ))
                )}
            </div>

            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <span
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={currentPage === i + 1 ? "active-page" : ""}
                    >
                        {i + 1}
                    </span>
                ))}
            </div>
        </div>
    );
}
