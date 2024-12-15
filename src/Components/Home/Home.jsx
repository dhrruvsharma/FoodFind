import { useEffect, useRef, useState } from "react";
import Card from "./Card";
import "./Home.css"
import { useDataContext } from "../../Context/DataContext";
import Nav from "../Nav/Nav";
import Loader from "../Loader/Loader";
import { Get, Search } from "../../API";
const Home = () => {
    const { data, setData, page, setPage, query, setQuery, end, setEnd, category, sort } = useDataContext();
    const containerRef = useRef();
    const { initial, setInitial } = useDataContext();
    const loading = useRef(false);
    const bottomRef = useRef(null);
    const [loader, setLoader] = useState(false);
    const [loaded, setLoaded] = useState(0);
    const [error, setError] = useState(false);

    const GetData = async () => {
        if (data.length / 25 >= page) {
            return;
        }
        setLoader(true);
        loading.current = true;
        try {
            const newData = await Get(page, category, sort);
            Promise.resolve(newData);
            setData(prev => [...prev, ...newData.data]);
            if (newData.count < 25) {
                setEnd(true);
            }
        } catch (error) {
            setError(true);
        } finally {
            setLoader(false);
            setInitial(true);
            loading.current = false;
            sessionStorage.removeItem?.("query");
        }
    }

    const ResetHeight = () => {
        const container = containerRef.current
        container.style.height = '20px';
    }

    useEffect(() => {
        const SavedSort = sessionStorage.getItem("sort");
        if (initial && sort !== SavedSort && sort !== undefined) {
            ResetHeight();
            setData([]);
            setPage(1);
            sessionStorage.removeItem("sort");
            sessionStorage.setItem("sort", sort);
        }
    }, [sort])

    const SearchQuery = async () => {
        if (query) {
            setLoader(true);
            loading.current = true;
            try {
                const newData = await Search(query, page, category, sort);
                Promise.resolve(newData);
                if (newData?.data) {
                    setData(prev => [...prev, ...newData?.data]);
                    if (newData?.count < 25) {
                        setEnd(true);
                    }
                }
            } catch (error) {
                setError(true);
            } finally {
                setLoader(false);
                loading.current = false;
                setInitial(true);
                controllerRef.current = null;
            }
        }
    }

    useEffect(() => {
        if (query !== "") {
            loading.current = true;
            if (page === 1) {
                ResetHeight();
            }
            SearchQuery();
        } else {
            loading.current = true;
            if (page === 1) {
                ResetHeight();
            }
            GetData();
        }
    }, [page])

    useEffect(() => {
        const savedQuery = sessionStorage.getItem("query");
        if (query !== "" && query !== savedQuery) {
            const Timer = setTimeout(() => {
                ResetHeight();
                setData([]);
                setPage(1);
                setEnd(false);
                setInitial(false);
                sessionStorage.setItem("query", query);
            }, 500)
            return () => clearTimeout(Timer);
        }
    }, [query])

    useEffect(() => {
        const savedCategory = sessionStorage.getItem?.("category");
        if (initial && category !== savedCategory && category !== undefined) {
            ResetHeight();
            setData([]);
            setPage(1);
            setEnd(false);
            sessionStorage.setItem("category", category);
        }
    }, [category])

    useEffect(() => {
        const saved = sessionStorage.getItem("pos");
        if (saved) {
            window.scrollTo({
                top: parseInt(saved),
                behavior: "smooth"
            })
            sessionStorage.removeItem("pos");
        }
    }, [])

    useEffect(() => {
        window.addEventListener("beforeunload", () => {
            sessionStorage.clear();
        })
    }, [])

    const Masonry = () => {
        const gap = 5;
        const container = containerRef.current;
        const items = Array.from(container.children);
        const containerWidth = container.offsetWidth;
        let columnCount = Math.floor(containerWidth / 150);
        if (columnCount > 6) {
            columnCount = 6;
        } else if (columnCount < 3) {
            columnCount = 3;
        }
        const columnWidth = (containerWidth - (gap * (columnCount - 1))) / columnCount;
        const columnHeights = Array(columnCount).fill(0);
        items?.forEach(item => {
            item.style.width = `${columnWidth}`;
            const minHeight = Math.min(...columnHeights);
            const columnIndex = columnHeights.indexOf(minHeight);
            const x = columnIndex * (columnWidth + gap);
            const y = minHeight + gap;
            item.style.position = "absolute";
            item.style.transform = `translate(${x}px,${y}px)`;
            columnHeights[columnIndex] += item.offsetHeight + 3;
        })
        container.style.height = `${Math.max(...columnHeights)}px`
    }


    useEffect(() => {
        if (data.length > 0 || loaded === data.length) {
            Masonry();
            window.addEventListener("resize", Masonry);
            return () => window.removeEventListener("resize", Masonry);
        } else {
            setLoader(true);
        }
    }, [data, loaded])

    useEffect(() => {
        if (!bottomRef.current || loading.current || !initial) {
            return;
        }
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !loading.current && !end) {
                setPage(prev => prev + 1);
            }
        }, { threshold: .5 });
        if (bottomRef.current) {
            observer.observe(bottomRef.current);
        }
        return () => {
            if (bottomRef.current) {
                observer.unobserve(bottomRef.current);
            }
        }
    }, [data, initial, loading.current, end])

    useEffect(() => {
        if (end) {
            setLoader(false);
        }
    }, [end])

    if (error) {
        return (
            <h1>An Error occured while fetching the products...</h1>
        )
    }


    return (
        <>
            <Nav setQuery={setQuery} />
            <div className="masonry" ref={containerRef} style={{marginTop: "30px"}}>
                {data?.map((item, index) => (
                    <Card name={item.product_name} image={item.image_url} key={index} onLoad={() => setLoaded(prev => prev + 1)} onError={() => setLoaded(prev => prev + 1)} id={item.code} />
                ))}
            </div>
            {loader && (
                <div className="load" style={{ "marginTop": "20px" }}>
                    <Loader height={"50px"} width={"50px"} />
                </div>
            )}
            {end && (
                <h1>Nothing More to Display...</h1>
            )}
            <div ref={bottomRef} style={{ height: "50px" }}></div>
        </>
    )
}
export default Home;