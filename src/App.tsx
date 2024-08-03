import { Button, Heading, Pane, Text, majorScale } from "evergreen-ui";

function App() {
	return (
		<>
			<Pane display="flex" padding={16} background="tint2" borderRadius={3} elevation={1}>
				<Pane flex={1} alignItems="center" display="flex">
					<Heading size={600}>Left Aligned</Heading>
				</Pane>
				<Pane>
					{/* Below you can see the marginRight property on a Button. */}
					<Button marginRight={16}>Button</Button>
					<Button appearance="primary">Primary Button</Button>
				</Pane>
			</Pane>
		</>
	);
}

export default App;
