import { AreaProvider } from '../../src';
import { Demo, TreeNode, Slot, DeclaredContent } from '../components/visuals';

export function FanOutDemo() {
  return (
    <Demo
      index="03"
      title="One feature fills many areas"
      description="A single feature component declares three Content components — one per area — populating three separate slots across the layout. Every payload shares the feature's color."
    >
      <AreaProvider>
        <TreeNode label="<AreaProvider>">
          <TreeNode label="<Layout>">
            <TreeNode label="<Header>">
              <Slot area="header" />
            </TreeNode>
            <TreeNode label="<Sidebar>">
              <Slot area="sidebar" />
            </TreeNode>
            <TreeNode label="<Footer>">
              <Slot area="footer" />
            </TreeNode>
          </TreeNode>
          <TreeNode label="<ProfileFeature>">
            <DeclaredContent area="header" from="<ProfileFeature>" tone={5}>
              Avatar
            </DeclaredContent>
            <DeclaredContent area="sidebar" from="<ProfileFeature>" tone={5}>
              Profile link
            </DeclaredContent>
            <DeclaredContent area="footer" from="<ProfileFeature>" tone={5}>
              Signed in as Dana
            </DeclaredContent>
          </TreeNode>
        </TreeNode>
      </AreaProvider>
    </Demo>
  );
}
