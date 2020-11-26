import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, ChildrenCategories, ChildrenCategory } from './styles';

import arrowGreen from '~/assets/icons/arrow_green.svg';

export default function MenuItem({
  category,
  selected,
  childrenSelected,
  setSelected,
  setChildrenSelected,
  subSelected,
  setSubChildrenSelected,
}) {
  const { id, name, url, all_children_categories } = category;

  const { pathname } = useLocation();
  return (
    <>
      <Container
        to={{
          pathname: `/${url}`,
          state: { id },
        }}
        active={pathname === `/${url}`}
      >
        <strong>{name}</strong>
        {all_children_categories.length !== 0 && (
          <img src={arrowGreen} alt="Abrir menu" />
        )}
      </Container>
      {all_children_categories.length !== 0 && pathname === `/${url}` && (
        <ChildrenCategories>
          {all_children_categories.map(cc => (
            <>
              <ChildrenCategory
                active={pathname === `/${cc.url}`}
                to={{
                  pathname: `/${cc.url}`,
                  state: { id: cc.id },
                }}
              >
                <strong>{cc.name}</strong>
                {cc.all_children_categories.length !== 0 && (
                  <img src={arrowGreen} alt="Abrir menu" />
                )}
              </ChildrenCategory>
              {cc.all_children_categories.length !== 0 &&
                childrenSelected === cc.id && (
                  <ChildrenCategories>
                    {cc.all_children_categories.map(subc => (
                      <ChildrenCategory
                        active={pathname === subc.url}
                        to={{
                          pathname: `/${url}`,
                          state: { id: subc.id },
                        }}
                        style={{ paddingLeft: 18.5 }}
                      >
                        <strong>{subc.name}</strong>
                      </ChildrenCategory>
                    ))}
                  </ChildrenCategories>
                )}
            </>
          ))}
        </ChildrenCategories>
      )}
    </>
  );
}
