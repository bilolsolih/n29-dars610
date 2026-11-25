import axios from 'axios';
import {useEffect, useState} from "react";
import CourseItem from "./CourseItem.tsx";

export interface PagedResult<T> {
  totalCount: number;
  totalPages: number;
  previousPage: number | null;
  currentPage: number;
  nextPage: number | null;
  data: T[];
}


export interface CourseItem {
  id: number;
  title: string;
  author: { id: number, fullName: string };
  language: { id: number, title: string, code: string };
  difficulty: { id: number, title: string, icon: string };
  category: { id: number, title: string };
  image: string;
  price: number;
  newPrice: number | null;
  rating: number | null;
  sectionsCount: number;
}

export default function App() {
  const [size, setSize] = useState(2);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [data, setData] = useState<PagedResult<CourseItem>>({
    totalCount: 0,
    totalPages: 0,
    previousPage: null,
    currentPage: 1,
    nextPage: null,
    data: [],
  });

  async function getAllCourses() {
    const response = await axios.get<PagedResult<CourseItem>>('http://10.10.3.14:8888/public/courses?size=' + size + '&page=' + page + '&search=' + search);
    setData(response.data);
  }

  useEffect(() => {
    getAllCourses();
  }, [size, page, search]);

  return <div className="relative p-7.75">
    <div>
      <input type="number" value={size} onChange={(event) => setSize(Number(event.target.value))}/>
      <input type="number" value={page} onChange={(event) => setPage(Number(event.target.value))}/>
      <input type="text" value={search} onChange={(event) => setSearch(event.target.value)}/>
    </div>

    {data.data.map(x => <CourseItem key={x.id} course={x}/>)}
  </div>;
}
