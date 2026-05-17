import { AreaProvider } from '../../src';
import { Demo, TreeNode, Slot, DeclaredContent } from '../components/visuals';

export function MultipleDemo() {
  return (
    <Demo
      index="02"
      title="Many contents, one area"
      description="Several Content components targeting the same area stack into that single RenderArea, in tree order."
    >
      <AreaProvider>
        <TreeNode label="<AreaProvider>">
          <TreeNode label="<Toolbar>">
            <Slot area="actions" />
          </TreeNode>
          <TreeNode label="<CopyFeature>">
            <DeclaredContent area="actions" from="<CopyFeature>" tone={1}>
              Copy
            </DeclaredContent>
          </TreeNode>
          <TreeNode label="<PasteFeature>">
            <DeclaredContent area="actions" from="<PasteFeature>" tone={2}>
              Paste
            </DeclaredContent>
          </TreeNode>
          <TreeNode label="<DeleteFeature>">
            <DeclaredContent area="actions" from="<DeleteFeature>" tone={3}>
              Delete
            </DeclaredContent>
          </TreeNode>
        </TreeNode>
      </AreaProvider>
    </Demo>
  );
}
