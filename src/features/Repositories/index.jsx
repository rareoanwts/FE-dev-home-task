import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { getRepositories } from './query';
import RepoItem from './RepoItem';

const ReposPage = ({ repositories }) => {
  const reposToRender = repositories.edges;

  return (
    <>
      {reposToRender.map(({ node }) => {
        return <RepoItem key={node.id} {...node} />;
      })}
    </>
  );
};

ReposPage.propTypes = {
  repositories: PropTypes.shape({
    edges: PropTypes.array.isRequired
  })
};

const RepositoriesHOC = () => {
  const { userId } = useParams();
  const { data } = useQuery(getRepositories(userId));

  return data ? <ReposPage {...data.repositoryOwner} /> : <></>;
};

export default RepositoriesHOC;
