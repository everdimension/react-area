import { AreaProvider } from '../../src';
import { Demo, TreeNode, Slot, DeclaredContent } from '../components/visuals';

export function BasicDemo() {
  return (
    <Demo
      index="01"
      title="Basic slot fill"
      description="A Content declared inside one branch of the tree renders into a RenderArea in a different branch. The colored boxes mark the same content at its declaration site and its render site."
    >
      <AreaProvider>
        <TreeNode label="<AreaProvider>">
          <TreeNode label="<Layout>">
            <TreeNode label="<Header>">
              <Slot area="toolbar" />
            </TreeNode>
          </TreeNode>
          <TreeNode label="<SaveFeature>">
            <DeclaredContent area="toolbar" from="<SaveFeature>" tone={1}>
              Save document
            </DeclaredContent>
          </TreeNode>
        </TreeNode>
      </AreaProvider>
    </Demo>
  );
}
