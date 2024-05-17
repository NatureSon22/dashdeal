import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8
};

const Shop = () => {
    const [state, setState] = useState({
        items: Array.from({ length: 20 }),
        hasMore: true
    });
    
    const fetchMoreData = () => {
        if (state.items.length >= 20) {
          setState((state) => ({ ...state, hasMore: false }));
          return;
        }
        // a fake async api call like which sends
        // 20 more records in .5 secs
        setTimeout(() => {
          setState({
            items: [...state.items, ]
          });
        }, 500);
    };


    return (
        <div style={{ height: "100vh" }}>
            <div>
                <h1>demo: react-infinite-scroll-component</h1>
                <hr />
                <InfiniteScroll
                    dataLength={state.items.length}
                    next={fetchMoreData}
                    hasMore={state.hasMore}
                    loader={<h4>Loading...</h4>}
                    style={{ overflowY: "scroll", height: "calc(100vh - 50px)" }} // Adjust height according to your needs
                    endMessage={
                        <p className="end" style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                        </p>
                    }
                    >
                    {state.items.map((i, index) => (
                        <div style={style} key={index}>
                        div - #{index}
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default Shop;
