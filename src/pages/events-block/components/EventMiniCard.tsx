/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import moment from "moment";
import { Col, Row } from "antd";

interface Event {
  title: string;
  description: string;
  date: string; // ISO 8601 format
  location: string;
  capacity: number;
  coverImage: string;
}

const Wrapper = styled.div`
  width: 100%;
  .event-card {
    border-radius: 12px;
    background: #fff;
    padding: 10px;
  }

  .event-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-self: stretch;
  }

  .event-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  .event-title {
    font-size: 14px;
    font-weight: 400;
    margin: 0;
    line-height: 1.3;
  }

  .event-details {
    font-size: 13px;
    color: #00000080;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`;

const EventMiniCard: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <Wrapper style={{ height: "100%" }}>
      <div style={{ height: "100%" }} className="event-card">
        <Row style={{ height: "100%" }} gutter={[16, 16]}>
          <Col xs={14} md={24} lg={14}>
            <img className="event-image" src={event?.coverImage} alt={event?.title} />
          </Col>
          <Col xs={10} md={24} lg={10}>
            <div className="event-content">
              <h3 className="event-title">{event?.title}</h3>
              <div className="event-details">{moment(event?.date).format("DD MMMM, YYYY")}</div>
            </div>
          </Col>
        </Row>
      </div>
    </Wrapper>
  );
};

export default EventMiniCard;
