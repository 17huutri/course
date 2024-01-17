import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";

export default function BreadcrumbStudying({ courseDetail }) {
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter((item) => item);

  const capitalize = (s) => (s && typeof s === 'string') ? s.charAt(0).toUpperCase() + s.slice(1) : '';

  return (
    <div>
      <Breadcrumb className="text-[25px] text-[#453f3f] font-semibold ">
        {pathnames.length > 1 ? (
          <Breadcrumb.Item>
            <Link to="/studyingcourse" className="!h-0">Studying Progress</Link>
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item>Studying Progress</Breadcrumb.Item>
        )}
        {pathnames.slice(1).map((name, index) => {
          const isLast = index === pathnames.length - 2;
          return isLast ? (
            <Breadcrumb.Item key={index}>{capitalize(courseDetail?.name)}</Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item key={index}>
              <Link to={`/${pathnames.slice(0, index + 2).join("/")}`}>{capitalize(name)}</Link>
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </div>
  );
}
