import React from "react"
import {
  ReactiveBase,
  CategorySearch,
  SingleRange,
  ResultCard,
  ReactiveList,
} from "@appbaseio/reactivesearch"

const ReactiveSearchWrapper = () => (
  <ReactiveBase
    app="carstore-dataset"
    credentials="4HWI27QmA:58c731f7-79ab-4f55-a590-7e15c7e36721"
  >
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ display: "flex", flexDirection: "column", width: "40%" }}>
        <CategorySearch
          componentId="searchbox"
          dataField="model"
          categoryField="brand.model"
          placeholder="Search for cars by model"
          style={{
            padding: "5px",
            marginTop: "10px",
          }}
        />
        <SingleRange
          componentId="ratingsfilter"
          title="Filter by ratings"
          dataField="rating"
          data={[
            { start: "4", end: "5", label: "4 stars and up" },
            { start: "3", end: "5", label: "3 stars and up" },
            { start: "2", end: "5", label: "2 stars and up" },
            { start: "1", end: "5", label: "see all ratings" },
          ]}
          defaultSelected="4 stars and up"
          style={{
            padding: "5px",
            marginTop: "10px",
          }}
        />
      </div>
      <ReactiveList
        componentId="result"
        dataField="name"
        title="Results"
        from={0}
        size={6}
        pagination={true}
        react={{
          and: ["searchbox", "ratingsfilter"],
        }}
        style={{
          width: "60%",
          textAlign: "center",
        }}
        render={({ data }) => (
          <ReactiveList.ResultCardsWrapper>
            {data.map(item => (
              <ResultCard key={item._id}>
                <ResultCard.Image src={item.image} />
                <ResultCard.Title
                  dangerouslySetInnerHTML={{
                    __html: item.brand,
                  }}
                />
                <ResultCard.Description>
                  <p>{item.model}</p>
                  <p>{`Rated with: ${item.rating} ★`}</p>
                </ResultCard.Description>
              </ResultCard>
            ))}
          </ReactiveList.ResultCardsWrapper>
        )}
      />
    </div>
  </ReactiveBase>
)

export default ReactiveSearchWrapper
