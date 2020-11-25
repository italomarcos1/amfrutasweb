import React from 'react';

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
  const { id, name, all_children_categories } = category;

  return (
    <>
      <Container
        onClick={() => {
          if (selected !== id) setSelected(id);
          else setSelected('none');
        }}
        active={selected === id}
      >
        <strong>{name}</strong>
        {all_children_categories.length !== 0 && (
          <img src={arrowGreen} alt="Abrir menu" />
        )}
      </Container>
      {all_children_categories.length !== 0 && selected === id && (
        <ChildrenCategories>
          {all_children_categories.map(cc => (
            <>
              <ChildrenCategory
                active={childrenSelected === cc.id}
                onClick={() => {
                  if (childrenSelected !== cc.id) setChildrenSelected(cc.id);
                  else if (cc.all_children_categories.length !== 0)
                    setChildrenSelected('none');
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
                        active={subSelected === subc.id}
                        onClick={() => {
                          setSubChildrenSelected(subc.id);
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
