import React from "react";
import Image from "next/image";
import { Badge, Button, ButtonGroup } from "@chakra-ui/react";
import { Card, CardBody, CardFooter } from "@chakra-ui/react";
import { Divider, Stack } from "@chakra-ui/react";

import { ItemObject, ItemStatus } from "@/app/types/items";

import "./ItemCard.scss";

type Props = {
  item: ItemObject;
  handleView: (id: string) => void;
  handleClaim: (item: ItemObject) => void;
};

const ItemCard: React.FC<Props> = (props) => {
  return (
    <Card maxW="sm" minW="sm" className="app__page-items-card">
      <CardBody className="app__page-items-card-body">
        <Image
          src={props.item.imageUrl}
          alt={props.item.name}
          width={1000}
          height={1000}
          className="card__img"
        />

        <Stack mt="6" spacing="2" className="card__info">
          <p className="card__name">
            {props.item.name}{" "}
            {props.item.status === ItemStatus.UNCLAIMED ? (
              <Badge ml="1" colorScheme="info">
                Unclaimed
              </Badge>
            ) : (
              <Badge ml="1" colorScheme="warning">
                {props.item.status}
              </Badge>
            )}
          </p>
          <p className="card__description">{props.item.description}</p>
          <p className="card__category">
            Category: <span>{props.item.category}</span>
          </p>
        </Stack>
      </CardBody>

      <Divider />

      <CardFooter className="app__page-items-card-footer">
        <ButtonGroup spacing="2">
          <Button
            variant="solid"
            colorScheme="primary"
            onClick={props.handleView.bind(this, props.item.id)}
          >
            See more
          </Button>
          {props.item.status === ItemStatus.UNCLAIMED && (
            <Button
              variant="ghost"
              colorScheme="primary"
              onClick={props.handleClaim.bind(this, props.item)}
            >
              Claim
            </Button>
          )}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
