import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container,
  ContainerButton,
  ChildrenCategories,
  ChildrenCategory,
} from './styles';

import arrowGreen from '~/assets/icons/arrow_green.svg';

export default function MenuItem({
  category,
  childrenSelected,
  categoryActive,
  setCategoryActive,
}) {
  const { id, name, slug, url, all_children_categories } = category;

  const { pathname } = useLocation();

  const [active, setActive] = useState(categoryActive);
  const [categoryUrl, setCategoryUrl] = useState(() => {
    const formattedUrl = url.split('/');

    return formattedUrl[1];
  });

  useEffect(() => {
    const formattedUrl = url.split('/');

    setCategoryUrl(formattedUrl[1]);
  }, [url]);

  useEffect(() => {
    const formattedPathname = pathname.split('/');

    const equal = formattedPathname.some(p => {
      return p === categoryUrl;
    });

    setActive(equal);
  }, [pathname, categoryUrl]);

  return (
    <>
      {all_children_categories.length === 0 ? (
        <Container
          to={{
            pathname: `/${url}`,
            state: { id },
          }}
          active={pathname === `/${url}` || active}
        >
          <strong>{name}</strong>
        </Container>
      ) : (
        <ContainerButton
          onClick={() => {
            if (active === name) setActive('');
            else {
              setActive(name);
              setCategoryActive(name);
            }
          }}
          active={categoryActive === name}
        >
          <strong>{name}</strong>
          {all_children_categories.length !== 0 && (
            <img src={arrowGreen} alt="Abrir menu" />
          )}
        </ContainerButton>
      )}
      {all_children_categories.length !== 0 &&
        (pathname === `/${url}` || (active && categoryActive === active)) && (
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
                  (childrenSelected === cc.id ||
                    pathname === `/${url}` ||
                    active) && (
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
