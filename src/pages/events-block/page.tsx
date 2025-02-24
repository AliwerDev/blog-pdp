import { Col, Flex, Row, Typography } from "antd";
import Styled from "./styled";
import EventMainCard, { Event } from "./components/EventMainCard";
import EventMiniCard from "./components/EventMiniCard";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "services/axios";
import { get } from "lodash";
import { parseEventsData } from "utils/helpers";
import { useMemo } from "react";

const EventsBlock = () => {
  const { data: eventsData } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () =>
      await axiosInstance.post("https://notion-api.pdp.uz/?database_id=1a1f4e0aaef3802bab84ecc50ba1f3d9", {
        sorts: [
          {
            property: "Date",
            direction: "descending",
          },
        ],
      }),
  });

  const events = useMemo(() => {
    let data: Event[] = parseEventsData(get(eventsData, "data", []));
    return data;
  }, [eventsData]);

  return (
    <Styled>
      <div className="container">
        <Flex justify="space-between" className="block_header">
          <Typography.Title className="title">Events tadbirlar</Typography.Title>
          {/* <Button className="">Open all</Button> */}
        </Flex>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <EventMainCard event={events[0]} />
          </Col>
          <Col xs={24} lg={12}>
            <Row style={{ height: "100%" }} gutter={[16, 16]}>
              <Col xs={24} md={8} lg={24}>
                <EventMiniCard event={events[1]} />
              </Col>
              <Col xs={24} md={8} lg={24}>
                <EventMiniCard event={events[2]} />
              </Col>
              <Col xs={24} md={8} lg={24}>
                <EventMiniCard event={events[3]} />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Styled>
  );
};
export default EventsBlock;
