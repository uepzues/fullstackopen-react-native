import { render, screen } from '@testing-library/react-native';
import RepositoriesListContainer from '../../../components/RepositoryList/RepositoryListContainer';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', async () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      // Add your test code here
      await render(<RepositoriesListContainer repositories={repositories} />);

      const repositoryItems = screen.getAllByTestId('repositoryItem');

      const [repositoryItem1, repositoryItem2] = repositoryItems;

      expect(repositoryItem1).toHaveTextContent(/jaredpalmer\/formik/);
      expect(repositoryItem1).toHaveTextContent(
        /Build forms in React, without the tears/,
      );
      expect(repositoryItem1).toHaveTextContent(/TypeScript/);
      expect(repositoryItem1).toHaveTextContent(/1\.6k/);
      expect(repositoryItem1).toHaveTextContent(/21\.9k/);
      expect(repositoryItem1).toHaveTextContent(/88/);
      expect(repositoryItem1).toHaveTextContent(/3/);

      expect(repositoryItem2).toHaveTextContent(/async-library\/react-async/);
      expect(repositoryItem2).toHaveTextContent(
        /Flexible promise-based React data loader/,
      );
      expect(repositoryItem2).toHaveTextContent(/JavaScript/);
      expect(repositoryItem2).toHaveTextContent(/69/);
      expect(repositoryItem2).toHaveTextContent(/1\.8k/);
      expect(repositoryItem2).toHaveTextContent(/72/);
      expect(repositoryItem2).toHaveTextContent(/3/);
    });
  });
});
